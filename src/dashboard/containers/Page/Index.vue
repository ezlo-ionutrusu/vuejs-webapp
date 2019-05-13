<template>
  <section class="dashboard">
    <div>
      <h2>{{title}}</h2>
      <button @click="modifyTitle()">Change title store + mixins</button>
    </div>
    <br>
    <div>
      <button @click="login()" :disabled="isDisabled">Try api request</button>
      <pre>
        {{loginInformation}}
      </pre>
    </div>
  </section>
</template>
<script>
import mixins from '@/dashboard/mixins/';
import { mapGetters } from 'vuex';

import { getAuthProvider } from '@/API/';

export default {
  mixins: [mixins],
  data() {
    return {
      title: 'Some title',
      loginInformation: null,
      isDisabled: false,
    };
  },
  computed:
  {
    ...mapGetters(['dashboard/getTitleDashboard']),
  },
  methods:
  {
    modifyTitle() {
      this.title = this.setTextToUpperCase(this.title);
      this.$store.dispatch('dashboard/setTitleDashboard', this.title);
    },
    async loginProcess(proxy) {
      this.loginInformation = `Fetching from ${proxy}...`;
      this.isDisabled = true;
      const data = await (await (fetch(proxy)
        .then(res => res)
        .catch((err) => {
          this.isDisabled = false;
          this.loginInformation = err;
        })
      ));
      return data;
    },
    login() {
      const { proxy } = JSON.parse(process.env.VUE_APP_PACKAGE);
      if (proxy) {
        this.loginProcess(proxy).then((data) => {
          if (data) {
            this.loginInformation = data.status;
            this.isDisabled = false;
          }
        });
      }
    },
  },
  mounted() {
    this.loginInformation = 'Connecting...';
    this.title = this['dashboard/getTitleDashboard'];
    getAuthProvider().auth.connect().then((response) => { this.loginInformation = JSON.parse(JSON.stringify(response)); });
  },
};
</script>
