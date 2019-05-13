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
      this.loginInformation = 'Fetching...';
      this.isDisabled = true;
      const data = await (await (fetch(proxy)
        .then(res => res)
        .catch((err) => {
          console.log('Error: ', err);
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
            console.log(data);
            this.isDisabled = false;
          }
        });
      }
    },
  },
  mounted() {
    this.title = this['dashboard/getTitleDashboard'];
  },
};
</script>
