import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/users',
        name: 'Users',
        /* route level code-splitting: this generates a separate chunk (about.[hash].js) for this route
        which is lazy-loaded when the route is visited. */
        component: () => import(/* webpackChunkName: "about" */ '../views/users/Users.vue')
    },
    {
        path: '/users/:id',
        name: 'User',
        props: true,
        component: () => import('../views/users/User.vue')
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('../views/users/Register.vue')
    }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router;
