import Vue from 'vue';
import VueRouter from './router';
import App from './App.vue';
import axios from 'axios';
import VueAxios from '../node_modules/vue-axios';
import VueYouTubeEmbed from '../node_modules/vue-youtube-embed';

Vue.use(VueAxios, axios);

Vue.use(VueYouTubeEmbed);

Vue.config.productionTip = false


new Vue({
  router: VueRouter,
  render: h => h(App)
}).$mount('#app')


/*
const base = axios.create({ baseURL: 'http://localhost:8080/'});
Vue.prototype.$http = base;    */


/*
new Vue({
  el: '#app',
  router: VueRouter,
  render: h => h(App)
})
*/

// Menu button
// 1. Hitta menu__toggle elementet.
// var menuButton = document.body.querySelector(".menu__toggle");

// 2. Hitta menu__content elementet.
// var menuContent = document.body.querySelector(".menu__content");

