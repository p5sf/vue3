
import {createApp} from 'vue'
import {key, store} from './store'
import router from "./router";

import App from './App.vue'
import './index.css'

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'
const app = createApp(App)

app.use(store, key)
app.use(ElementPlus)
app.use(router)
app.mount('#app')