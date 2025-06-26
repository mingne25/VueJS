<template>
  <div class="max-w-3xl mx-auto p-4">
    <header class="mb-4">
      <h1 class="text-2xl font-bold">Blog App</h1>
      <nav class="mt-2">
        <router-link to="/" class="mr-4 text-blue-500 hover:underline">Home</router-link>
        <router-link to="/posts" class="mr-4 text-blue-500 hover:underline">Posts</router-link>
        <router-link to="/post-form" class="text-blue-500 hover:underline">Create Post</router-link>
      </nav>
    </header>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style scoped>

</style>