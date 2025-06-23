<template>
  <form @submit.prevent="onSubmit">
    <input
      v-model="form.name"
      placeholder="Tên sản phẩm"
      :class="{ 'error': errors.name }"
    />
    <span v-if="errors.name" class="error-msg">{{ errors.name }}</span>

    <input
      v-model.number="form.price"
      placeholder="Giá"
      type="number"
      :class="{ 'error': errors.price }"
    />
    <span v-if="errors.price" class="error-msg">{{ errors.price }}</span>

    <input
      v-model.number="form.quantity"
      placeholder="Số lượng"
      type="number"
      :class="{ 'error': errors.quantity }"
    />
    <span v-if="errors.quantity" class="error-msg">{{ errors.quantity }}</span>

    <button type="submit">Lưu</button>
  </form>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps(['initialData'])
const emit = defineEmits(['submit'])

const form = ref({
  name: '',
  price: '',
  quantity: '',
})

const errors = ref({})

watch(() => props.initialData, (val) => {
  if (val) form.value = { ...val }
}, { immediate: true })

const validate = () => {
  errors.value = {}
  if (!form.value.name.trim()) errors.value.name = 'Vui lòng nhập tên sản phẩm'
  if (form.value.price === '' || form.value.price <= 0) errors.value.price = 'Giá phải lớn hơn 0'
  if (form.value.quantity === '' || form.value.quantity < 0) errors.value.quantity = 'Số lượng phải >= 0'
  return Object.keys(errors.value).length === 0
}

const onSubmit = () => {
  if (!validate()) return
  emit('submit', { ...form.value })
  form.value = { name: '', price: '', quantity: '' }
}
</script>

<style scoped>
.error-msg {
  color: red;
  font-size: 0.85em;
  margin-bottom: 2px;
}
input.error {
  border: 1px solid red;
}
form {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
}
</style>