/* eslint-disable import/order */
import '@/@iconify/icons-bundle'
import App from '@/App.vue'
import layoutsPlugin from '@/plugins/layouts'
import vuetify from '@/plugins/vuetify'
import { loadFonts } from '@/plugins/webfontloader'
import router from '@/router'
import '@core/scss/template/index.scss'
import '@styles/styles.scss'
import { MotionPlugin } from '@vueuse/motion'
import 'form-wizard-vue3/dist/form-wizard-vue3.css'
import 'mapbox-gl/dist/mapbox-gl.css'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import 'vue3-toastify/dist/index.css'

loadFonts()

// Create vue app
const app = createApp(App)

// Use plugins
app.use(vuetify)
app.use(createPinia())
app.use(router)
app.use(MotionPlugin)
app.use(layoutsPlugin)

// Mount vue app
app.mount('#app')
