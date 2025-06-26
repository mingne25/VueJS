<template>
  <div class="flex flex-col gap-4 mb-4">
    <h2 class="text-xl font-semibold">{{ isEditing ? 'Edit Post' : 'Create Post' }}</h2>
    <div v-if="mutationError" class="text-red-500 text-sm">
      Error: {{ mutationError.message }}
    </div>
    <input v-model="form.title" placeholder="Title" class="border p-2 rounded" :disabled="loading" />
    <textarea v-model="form.body" placeholder="Body" class="border p-2 rounded h-32" :disabled="loading" />
    <input v-model="form.userId" placeholder="User ID" class="border p-2 rounded" :disabled="loading" />
    <button @click="submit" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
      :disabled="loading">
      {{ loading ? 'Submitting...' : isEditing ? 'Update' : 'Create' }}
    </button>
    <router-link to="/posts" class="text-blue-500 hover:underline">Back to Posts</router-link>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useMutation, useQuery } from '@vue/apollo-composable';
import { CREATE_POST, UPDATE_POST } from '../graphql/mutations';
import { GET_POST, GET_POSTS } from '../graphql/queries';

export default {
  name: 'PostFormView',
  setup() {
    const route = useRoute();
    const router = useRouter();
    const isEditing = computed(() => !!route.params.id);

    const form = ref({
      title: '',
      body: '',
      userId: '',
    });

    // Nếu là sửa, lấy dữ liệu cũ
    const { result } = useQuery(GET_POST, { id: route.params.id });
    onMounted(() => {
      if (isEditing.value && result.value?.post) {
        form.value = {
          title: result.value.post.title,
          body: result.value.post.body,
          userId: result.value.post.user?.id || '',
        };
      }
    });

    const { mutate: create, loading: creating, error: createError } = useMutation(CREATE_POST, {
      refetchQueries: [{ query: GET_POSTS }],
    });

    const { mutate: update, loading: updating, error: updateError } = useMutation(UPDATE_POST, {
      refetchQueries: [{ query: GET_POSTS }],
    });

    const loading = computed(() => creating.value || updating.value);
    const mutationError = computed(() => createError.value || updateError.value);

    // Đặt submit bên trong setup!
    const submit = async () => {
      try {
        if (isEditing.value) {
          await update({
            id: route.params.id,
            input: {
              title: form.value.title,
              body: form.value.body,
            },
          });
          // Cập nhật localStorage khi sửa
          const posts = JSON.parse(localStorage.getItem('posts') || '[]');
          const idx = posts.findIndex(p => String(p.id) === String(route.params.id));
          if (idx !== -1) {
            posts[idx].title = form.value.title;
            posts[idx].body = form.value.body;
            // Nếu bạn cho phép sửa userId thì thêm dòng này:
            // posts[idx].user.id = form.value.userId;
            localStorage.setItem('posts', JSON.stringify(posts));
          }
        } else {
          // LUÔN lưu vào localStorage kể cả khi mutation thành công
          const posts = JSON.parse(localStorage.getItem('posts') || '[]');
          const newId = Date.now().toString();
          posts.push({
            id: newId,
            title: form.value.title,
            body: form.value.body,
            user: { id: form.value.userId },
          });
          localStorage.setItem('posts', JSON.stringify(posts));
          // Gọi mutation để đồng bộ với API (dù API không lưu lại)
          await create({
            input: {
              title: form.value.title,
              body: form.value.body,
              userId: String(form.value.userId),
            },
          });
        }
        router.push('/posts');
      } catch (err) {
        if (!isEditing.value) {
          const posts = JSON.parse(localStorage.getItem('posts') || '[]');
          // Kiểm tra trùng title/body/userId nếu cần, hoặc chỉ kiểm tra id
          const newId = Date.now().toString();
          // Đảm bảo không thêm trùng bài viết (ví dụ kiểm tra title/body)
          const exists = posts.some(
            p => p.title === form.value.title && p.body === form.value.body && p.user?.id === form.value.userId
          );
          if (!exists) {
            posts.push({
              id: newId,
              title: form.value.title,
              body: form.value.body,
              user: { id: form.value.userId },
            });
            localStorage.setItem('posts', JSON.stringify(posts));
          }
          router.push('/posts');
        } else {
          // Fallback sửa localStorage khi offline
          const posts = JSON.parse(localStorage.getItem('posts') || '[]');
          const idx = posts.findIndex(p => String(p.id) === String(route.params.id));
          if (idx !== -1) {
            posts[idx].title = form.value.title;
            posts[idx].body = form.value.body;
            // posts[idx].user.id = form.value.userId;
            localStorage.setItem('posts', JSON.stringify(posts));
          }
          router.push('/posts');
        }
      }
    };

    return {
      form,
      isEditing,
      submit,
      loading,
      mutationError,
    };
  },
};
</script>