<template>
  <div>
    <div v-if="loading" class="text-center">Loading...</div>
    <div v-else-if="post">
      <h2 class="text-xl font-semibold mb-2">{{ post.title }}</h2>
      <p class="text-gray-700 mb-4">{{ post.body }}</p>
      <p class="text-sm text-gray-500">User ID: {{ post.user?.id }}</p>
      <router-link :to="`/post-form/${post.id}`" class="text-blue-500 hover:underline">
        Edit Post
      </router-link>
      <button @click="handleDelete" class="ml-2 text-red-500 hover:underline">Delete</button>
    </div>
    <div v-else-if="error" class="text-red-500">
      Post not found.
      <button @click="refetch" class="ml-2 text-blue-500 hover:underline">Retry</button>
    </div>
    <div v-else class="text-gray-500">Post not found.</div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import { useQuery, useMutation } from '@vue/apollo-composable'
import { useRoute, useRouter } from 'vue-router'
import { GET_POST, GET_POSTS } from '../graphql/queries'
import { DELETE_POST } from '../graphql/mutations'

export default {
  name: 'PostDetail',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const post = ref(null)
    const { result, loading, error, refetch } = useQuery(GET_POST, { id: route.params.id }, { errorPolicy: 'all' })

    // Mutation xóa bài viết
    const { mutate: deletePost } = useMutation(DELETE_POST, {
      refetchQueries: [{ query: GET_POSTS }],
    })

    // Cập nhật post khi có kết quả từ API
    watch(
      () => result.value?.post,
      (newPost) => {
        if (newPost) post.value = newPost
      },
      { immediate: true }
    )

    // Fallback: lấy từ localStorage nếu có lỗi và chưa có post
    watch(
      [() => error.value, () => post.value],
      ([err, curPost]) => {
        if (err && !curPost) {
          const cachedPosts = localStorage.getItem('posts')
          if (cachedPosts) {
            const found = JSON.parse(cachedPosts).find(p => String(p.id) === String(route.params.id))
            if (found) post.value = found
          }
        }
      }
    )

    const handleDelete = async () => {
      if (confirm('Are you sure you want to delete this post?')) {
        try {
          await deletePost({ id: route.params.id });
          // Xóa khỏi localStorage luôn, kể cả khi mutation thành công
          const posts = JSON.parse(localStorage.getItem('posts') || '[]');
          const filtered = posts.filter(p => String(p.id) !== String(route.params.id));
          localStorage.setItem('posts', JSON.stringify(filtered));
          router.push('/posts');
        } catch (err) {
          // Fallback: xóa trong localStorage nếu API lỗi
          const posts = JSON.parse(localStorage.getItem('posts') || '[]');
          const filtered = posts.filter(p => String(p.id) !== String(route.params.id));
          localStorage.setItem('posts', JSON.stringify(filtered));
          router.push('/posts');
        }
      }
    };

    return {
      post,
      loading,
      error,
      refetch,
      handleDelete,
    }
  },
}
</script>