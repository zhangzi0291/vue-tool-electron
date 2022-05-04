import {createApp} from 'vue'

import App from '@/App.vue'

import router from './router'

import Antd from '@/plugins/antd';
import axios from '@/plugins/axios';
import north from '@/plugins/north/north';
import electron from '@/plugins/electron';

import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

const app = createApp(App)


window.vm = app

app.component("md-editor", MdEditor)

app.use(router)
    .use(Antd)
    .use(axios)
    .use(north)
    .use(electron)
    .mount('#app')
