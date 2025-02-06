import {createRouter, createWebHistory} from 'vue-router'
import Home from '../views/Home.vue'
import Bills from '../views/Bills.vue'


const routes = [
    { path: '/', name:'home', component: Home },
    { path: '/bills', name:'Bills', component: Bills },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL), // represents the base use of your project
    routes,
})

export default router