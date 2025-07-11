import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { IonicVue } from '@ionic/vue'

import '@ionic/vue/css/core.css'
import '@ionic/vue/css/normalize.css'
import '@ionic/vue/css/structure.css'
import '@ionic/vue/css/typography.css'
import './theme/variables.css'
import 'leaflet/dist/leaflet.css';

const app = createApp(App)
  .use(IonicVue)
  .use(router)

// ✅ Mount after router is ready
router.isReady().then(() => {
  app.mount('#app')
})
