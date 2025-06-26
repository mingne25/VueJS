<template>
  <div>
    <h2 class="text-xl font-bold mb-4">Blog Posts</h2>
    <div v-if="loading" class="text-center">Loading...</div>
    <div v-else-if="error && posts.length === 0" class="text-red-500">
      <span>Error: {{ error.message }}</span>
      <button @click="retryFetch" class="ml-2 text-blue-500 hover:underline">Retry</button>
    </div>
    <div v-else-if="posts.length === 0" class="text-gray-500">
      No posts available
    </div>
    <ul v-else>
  <li v-for="post in posts" :key="post.id" class="mb-4 border-b pb-2">
    <h3 class="font-semibold">{{ post.title }}</h3>
    <p class="text-gray-600">{{ post.body.slice(0, 80) }}...</p>
    <router-link :to="`/posts/${post.id}`" class="text-blue-500 hover:underline">View Details</router-link>
  </li>
</ul>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import { GET_POSTS } from '../graphql/queries'

export default {
  name: 'PostsView',
  setup() {
    const posts = ref([])
    const { result, loading, error, refetch } = useQuery(GET_POSTS)

    // Merge localStorage và API, KHÔNG ghi đè localStorage bằng toàn bộ danh sách!
    const mergePosts = () => {
      const localPosts = JSON.parse(localStorage.getItem('posts') || '[]')
      if (result.value?.posts?.data) {
        // Chỉ merge, không ghi đè localStorage
        posts.value = [
          ...localPosts,
          ...result.value.posts.data.filter(apiPost => !localPosts.some(lp => String(lp.id) === String(apiPost.id)))
        ]
        // KHÔNG có dòng này nữa:
        // localStorage.setItem('posts', JSON.stringify(posts.value))
      } else if (localPosts.length > 0) {
        posts.value = localPosts
      } else {
        posts.value = []
      }
    }

    watch(() => result.value, mergePosts, { immediate: true })
    watch(() => error.value, (err) => { if (err) mergePosts() })

    const retryFetch = async () => {
      try {
        await refetch()
      } catch {
        mergePosts()
      }
    }

    return {
      posts,
      loading,
      error,
      retryFetch,
    }
  },
}
</script>