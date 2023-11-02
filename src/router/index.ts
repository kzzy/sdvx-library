import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "Home",
        component: () => import('@/pages/HomePage.vue'),
    },
    {
        path: "/search",
        name: "Search",
        component: () => import('@/pages/SearchPage.vue'),
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router