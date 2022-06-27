import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
//全部引入
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
//app.use(Elementplus)
//按需引入
createApp(App).use(router).mount('#app')
