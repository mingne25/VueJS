<template>
  <div class="item">
    <div>
      {{ expense.name }} - {{ expense.amount }} VNĐ
      ({{ expense.category }}) - {{ expense.date }}
    </div>
    <button @click.stop="$emit('delete', expense.id)">Xóa</button>
  </div>
</template>

<script>
export default {
  props: ['expense']
}
</script>

<style scoped>
.item {
  display: flex;
  justify-content: space-between;
  padding: 8px;
  border-bottom: 1px solid #ddd;
}
</style>
