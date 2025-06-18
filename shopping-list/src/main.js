import { createApp } from 'vue'
import App from './App.vue'
import Navbar from './components/Navbar.vue'

const app = createApp(App)
app.component('Navbar', Navbar) // Đăng ký global
app.mount('#app')
// createApp(App).mount('#app')
