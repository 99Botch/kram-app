import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
// import store from '@/store/index.js'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'PageNotFound',
        /* route level code-splitting: this generates a separate chunk (about.[hash].js) for this route
        which is lazy-loaded when the route is visited. */
        component: () => import('@/components/PageNotFound.vue')
    },
    {
        path: '/logout',
        name: 'Signout',
        component: () => import('@/views/Signout.vue')
    },
    {
        path: '/users',
        name: 'Users',
        component: () => import('@/views/users/Users.vue'),
    },
    {
        path: '/users/:id',
        name: 'User',
        props: true,
        component: () => import('@/views/users/User.vue')
    },
    // {
    //     path: '/register',
    //     name: 'Register',
    //     component: () => import('@/views/users/Register.vue')
    // },
    // {
    //     path: '/login',
    //     name: 'Login',
    //     component: () => import('@/views/Login.vue')
    // },
    {
        path: '/edit/:id',
        name: 'EditUser',
        component: () => import('@/views/users/EditUser.vue')
    },
    // DECKS
    {
        path: '/decks',
        name: 'Decks',
        component: () => import('@/views/decks/Index.vue')
    },
    // CARDS
    {
        path: '/cards',
        name: 'Cards',
        component: () => import('@/views/cards/Index.vue')
    },
    // REVIEW
    {
        path: '/review/:deckId',
        name: 'Review',
        component: () => import('@/views/reviews/Index.vue')
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})


export default router;
