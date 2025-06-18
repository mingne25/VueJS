<template>
  <select v-model="selected" style="margin-bottom: 16px;">
    <option value="">Tất cả danh mục</option>
    <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
  </select>
</template>

<script>
export default {
  props: ['categories', 'modelValue'],
  computed: {
    selected: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emit('update:modelValue', value)
      }
    }
  }
}
</script>