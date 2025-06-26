<template>
  <div class="text-center">
    <h2 class="text-xl font-semibold mb-4">Welcome to Blog App</h2>
    <p class="mb-4">Manage your blog posts with ease using Vue.js and GraphQL.</p>
    <router-link to="/posts" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
      View Posts
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
};
</script>