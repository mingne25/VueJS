<template>
  <form @submit.prevent="submitTask" class="form">
    <input
      v-model="input"
      type="text"
      placeholder="Nhập công việc..."
    />
    <button type="submit">Thêm</button>
  </form>
</template>

<script>
export default {
  props: {
    modelValue: String
  },
  emits: ['add', 'update:modelValue'],
  computed: {
    input: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emit('update:modelValue', value)
      }
    }
  },
  methods: {
    submitTask() {
      this.$emit('add', this.input)
    }
  }
}
</script>

<style>
.form {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}
input {
  flex: 1;
  padding: 8px;
}
button {
  padding: 8px 12px;
}
</style>
