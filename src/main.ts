import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import element from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'

const app = createApp(App)
app
.use(store)
.use(router)
.use(element, { size: 'large', zIndex: 3000 })
.mount('#app')
