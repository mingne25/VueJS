<template>
  <form @submit.prevent="handleSubmit" style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px;">
    <input v-model="form.name" @keyup.enter="handleSubmit" @blur="touched.name = true" placeholder="Tên khoản chi" />
    <span v-if="touched.name && errors.name" class="text-red-500">{{ errors.name }}</span>

    <input v-model.number="form.amount" type="number" @blur="touched.amount = true" placeholder="Số tiền" />
    <span v-if="touched.amount && errors.amount" class="text-red-500">{{ errors.amount }}</span>

    <select v-model="form.category" @blur="touched.category = true">
      <option disabled value="">Chọn danh mục</option>
      <option>Ăn uống</option>
      <option>Di chuyển</option>
      <option>Giải trí</option>
    </select>
    <span v-if="touched.category && errors.category" class="text-red-500">{{ errors.category }}</span>

    <input v-model="form.date" @blur="touched.date = true" type="date" />
    <span v-if="touched.date && errors.date" class="text-red-500">{{ errors.date }}</span>

    <button type="submit" @click.stop :disabled="!isValid">Thêm</button>
    <p v-if="form.amount > 1000000" style="color: red;">Cảnh báo: Số tiền lớn!</p>
  </form>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        amount: null,
        category: '',
        date: ''
      },
      errors: {},
      touched: {
        name: false,
        amount: false,
        category: false,
        date: false
      }
    }
  },
  computed: {
    isValid() {
      return Object.keys(this.validate()).length === 0
    }
  },
  methods: {
    validate() {
      const errors = {}
      if (!this.form.name || this.form.name.length < 3)
        errors.name = 'Tên tối thiểu 3 ký tự'
      if (!this.form.amount || this.form.amount <= 0)
        errors.amount = 'Số tiền phải dương'
      if (!this.form.category)
        errors.category = 'Phải chọn danh mục'
      if (!this.form.date || new Date(this.form.date) > new Date())
        errors.date = 'Ngày không hợp lệ'
      this.errors = errors
      return errors
    },
    handleSubmit() {
      if (this.isValid) {
        this.$emit('submit', { ...this.form })
        this.form = { name: '', amount: null, category: '', date: '' }
        this.errors = {},
        this.touched = { name: false, amount: false, category: false, date: false }
      }
    }
  },
  watch: {
    'form.amount'(val) {
      if (val > 1000000) console.warn('Chi tiêu lớn!')
    }
  }
}
</script>

<style scoped>
.text-red-500 {
  color: red;
  font-size: 0.8em;
}
</style>
