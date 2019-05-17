import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export const options = {
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [],
};
export default new Router(options);
