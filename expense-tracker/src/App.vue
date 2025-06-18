<template>
  <div class="app">
    <CategoryFilter
      :categories="categories"
      v-model="selectedCategory"
    />
    <ExpenseForm @submit="addExpense" />
    <ExpenseList
      :expenses="filteredExpenses"
      @delete="deleteExpense"
    />
    <p><strong>Tổng chi tiêu:</strong> {{ totalAmount }} VNĐ</p>
  </div>
</template>

<script>
import ExpenseForm from './components/ExpenseForm.vue'
import ExpenseList from './components/ExpenseList.vue'
import CategoryFilter from './components/CategoryFilter.vue'

export default {
  components: { ExpenseForm, ExpenseList, CategoryFilter },
  data() {
    return {
      expenses: [],
      categories: ['Ăn uống', 'Di chuyển', 'Giải trí'],
      selectedCategory: '',
    }
  },
  computed: {
    filteredExpenses() {
      if (!this.selectedCategory) return this.expenses
      return this.expenses.filter(e => e.category === this.selectedCategory)
    },
    totalAmount() {
      return this.filteredExpenses.reduce((sum, e) => {
        const amount = Number(e.amount)
        return sum + (isNaN(amount) ? 0 : amount)
      }, 0)
    }
  },
  watch: {
    expenses: {
      handler(val) {
        localStorage.setItem('expenses', JSON.stringify(val))
      },
      deep: true
    }
  },
  created() {
    const data = localStorage.getItem('expenses')
    if (data) this.expenses = JSON.parse(data)
  },
  methods: {
    addExpense(exp) {
      if (
        !exp ||
        !exp.name ||
        !exp.amount ||
        !exp.category ||
        !exp.date
      ) return
      this.expenses.push({ ...exp, id: Date.now() })
    },
    deleteExpense(id) {
      this.expenses = this.expenses.filter(e => e.id !== id)
    }
  }
}
</script>

<style scoped>
.app {
  max-width: 600px;
  margin: 0 auto;
}
</style>
