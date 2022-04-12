import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import store from './store';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

createApp(App).use(store).use(router).use(ElementPlus).mount('#app');

const session = localStorage.getItem('session');
(session === null) ? localStorage.setItem('session', false) : null;

const page = localStorage.getItem('page');
(page === null) ? localStorage.setItem('page', 'deck') : null;

App.prototype.$http = axios;
