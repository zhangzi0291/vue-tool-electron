import {createRouter, createWebHashHistory, RouteRecordRaw} from 'vue-router'

import Frame from '@/views/Frame/Frame.vue'
import AppHome from '@/views/AppHome/AppHome.vue'
import JsonFormat from '@/views/Tool/JsonFormat.vue'
import Base64Tool from '@/views/Tool/Base64Tool.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Frame',
        component: Frame,
        redirect:'/home',
        children:[
            {
                path: '/home',
                name: 'AppHome',
                component: AppHome
            },{
                path: '/JsonFormat',
                name: 'JsonFormat',
                component: JsonFormat
            },{
                path: '/Base64Tool',
                name: 'Base64Tool',
                component: Base64Tool
            },
        ],
    },

]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
