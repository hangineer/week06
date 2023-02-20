import { createApp } from 'vue'

import './style.css'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

import './assets/all.scss'
const app = createApp(App)
// 把axios作為vue套件使用，以this.$http調用axios
app.use(VueAxios, axios)
app.use(VueSweetalert2)
app.use(router)
app.mount('#app')
