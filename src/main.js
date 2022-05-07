/**
 * I won't be covering necessarily html
 * I might just highlight interestting points here and there
 * 
 * I won't do any css comment as I don't think it is relevant to the project
 * There is nothing ground breaking otehr tht I'm using SASS and did colse to everything myself aside from
 * a few Element Plus components
 * 
 * Most Comment will focus the JavaScript code
 * I'll go in depth JS with a few files then just cover some unique pieces
 */

// FIrst step starts by creating a new app and attaching libraries' components to it such as axios or vuex
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import store from './store';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

createApp(App).use(store).use(router).use(ElementPlus).mount('#app');


// I made a locla storage check to see wheter user is logged in
const session = localStorage.getItem('session');
(session === null) ? localStorage.setItem('session', false) : null;

// default page is the deck apge, the one users land in
const page = localStorage.getItem('page');
(page === null) ? localStorage.setItem('page', 'deck') : null;

App.prototype.$http = axios;
