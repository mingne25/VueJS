<template>
  <div class="p-2 border-b border-gray-200 flex justify-between">
    <div>
      <h3 class="text-lg font-medium">{{ post.title }}</h3>
      <p class="text-gray-600 text-sm">{{ post.body.slice(0, 100) }}...</p>
    </div>
    <router-link :to="`/posts/${post.id}`" class="text-blue-500 hover:underline">
      View Details
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'PostItem',
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
};
</script>