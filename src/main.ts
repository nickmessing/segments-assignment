import '@/assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from '@/App.vue'
import { createTinybaseVue } from 'vue-tinybase'
import { store } from '@/store'

const app = createApp(App)

app.use(createTinybaseVue(store))
app.use(createPinia())

app.mount('#app')
