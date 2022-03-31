import {createApp} from 'vue'

import App from '@/App.vue'

import router from './router'

import Antd from '@/plugins/antd';
import axios from '@/plugins/axios';
import north from '@/plugins/north/north';


const app = createApp(App)


window.vm = app


app.use(router)
    .use(Antd)
    .use(axios)
    .use(north)
    .mount('#app')
