import Vue from 'vue';
import Router from 'vue-router';
import Main from '@/main/containers/Main/Index.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/dashboard/containers/Page/Index.vue'),
    },
    { path: '*', redirect: '/' },
  ],
});
