import Vue from 'vue';
import VueRouter from 'vue-router';
import About from './views/about.vue';

// View component import
import AppHome from './views/home.vue';

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
 // mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      // URL när view component ska visas
      path: '/',
      name: 'home',
      // View component registrering
      component: AppHome
    },
    {
      // URL när view component ska visas
      path: '/about',
      name: 'about',
      // Lazy-loaded view component
      component: About      //() => {import('./views/about.vue')}   // webpackChunkName: "about" 
    }
  ]
})

