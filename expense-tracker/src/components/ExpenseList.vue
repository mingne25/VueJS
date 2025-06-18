<template>
  <div>
    <ExpenseItem
      v-for="e in sortedExpenses"
      :key="e.id"
      :expense="e"
      @delete="$emit('delete', $event)"
    />
  </div>
</template>

<script>
import ExpenseItem from './ExpenseItem.vue'

export default {
  props: ['expenses'],
  components: { ExpenseItem },
  computed: {
    sortedExpenses() {
      return [...this.expenses]
        .filter(e => e.name && e.amount && e.date)
        .sort((a, b) => new Date(b.date) - new Date(a.date))
    }
  }
}
</script>
