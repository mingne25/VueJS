<template>
  <form @submit.prevent="handleSubmit" class="flex gap-2 mb-4 animate__animated animate__bounceIn">
    <input
      v-model="title"
      type="text"
      placeholder="Nhập công việc"
      class="w-full p-2 border rounded"
    />
    <button
      :class="[
        'text-white p-2 rounded',
        isValid ? 'bg-green-500 hover:bg-blue-600' : 'bg-gray-300'
      ]"
    >
      Thêm
    </button>
  </form>
</template>


<script>
export default {
  data() {
    return { title: '' }
  },
  computed: {
    isValid() {
      return this.title.trim().length > 0
    }
  },
  methods: {
    handleSubmit() {
      if (!this.title.trim()) return
      this.$emit('submit', this.title)
      this.title = ''
    }
  }
}
</script>
<style scoped>
/* Có thể tùy chỉnh hiệu ứng đầu vào */
input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 1px #3b82f6;
}
</style>