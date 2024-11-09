import './assets/main.css';
import "@/assets/base.css";
import "bootstrap/dist/css/bootstrap.css";
import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from "vue-router";
import { routes } from './route';
import { store } from './store/index';

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 };
  },
});

const app = createApp(App); 
app.use(router);
app.use(store);
app.mount("#app");

import "bootstrap/dist/js/bootstrap.js";

