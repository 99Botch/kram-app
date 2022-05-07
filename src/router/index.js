/**
 * Router is a Vue library to create single page applications
 * When entering the matching URL, Vue ROuter umounts the given component, loads and mount the one attach to that URL
 */
import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue';

const routes = [
    {
        // URL 
        path: '/',
        // Component URL
        name: 'Home',
        // and component itself
        component: Home,
    },
    {
        path: '/kram',
        name: 'MainCnt',
        component: () => import('@/views/Kram.vue')
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
