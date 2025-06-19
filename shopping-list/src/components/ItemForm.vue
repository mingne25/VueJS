<template>
  <form @submit.prevent="onSubmit">
    <input v-model="form.name" placeholder="Tên mặt hàng"/>
    <input type="number" v-model.number="form.quantity" min="1" />
    <button type="submit">Lưu</button>
  </form>
</template>

<script setup>
import { reactive, watchEffect } from 'vue'

const props = defineProps({
  initialData: {
    type: Object,
    default: () => ({ name: '', quantity: 1, purchased: false })
  }
})

const emit = defineEmits(['submit'])
const form = reactive({ ...props.initialData })

watchEffect(() => Object.assign(form, props.initialData)) // reset nếu props thay đổi

const onSubmit = () => emit('submit', { ...form })
</script>

<style scoped>
form {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}
</style>