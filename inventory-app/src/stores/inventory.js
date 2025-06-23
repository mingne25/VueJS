import { defineStore } from 'pinia'

export const useInventoryStore = defineStore('inventory', {
  state: () => ({
    products: [],
    // loading: false,
    // error: null,
  }),
  getters: {
    totalValue: (state) => state.products.reduce((sum, p) => sum + p.price * p.quantity, 0),
    productCount: (state) => state.products.length
  },
  actions: {
    fetchProducts() {
      const data = localStorage.getItem('products')
      this.products = data ? JSON.parse(data) : []
    },
    addProduct(product) {
      const newProduct = { ...product, id: Date.now() + Math.random() }
      this.products.push(newProduct)
      localStorage.setItem('products', JSON.stringify(this.products))
    },
    updateProduct(id, product) {
      const index = this.products.findIndex(p => p.id === id)
      if (index !== -1) {
        this.products[index] = { ...this.products[index], ...product, id }
        this.saveProducts()
      }
    },
    deleteProduct(id) {
      this.products = this.products.filter(p => p.id !== id)
      localStorage.setItem('products', JSON.stringify(this.products))
    },
    saveProducts() {
      localStorage.setItem('products', JSON.stringify(this.products))
    }
  }
})
