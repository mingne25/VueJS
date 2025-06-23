export function autoSavePlugin({ store }) {
  store.$subscribe((mutation, state) => {
    localStorage.setItem('products', JSON.stringify(state.products))
  })
}
