import Vue from 'vue';
import Vuex from 'vuex';

// actions, mutations, state and getters from main module
import main from '@/main/vuex/index';
// actions, mutations, state and getters from dashbboard module
import dashboard from '@/dashboard/vuex/index';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    main,
    dashboard,
  },
  strict: true,
});
global.store = store;
export default store;
