<template>
  <section class="dashboard">
    <h2>{{title}}</h2>
    <button @click="modifyTitle()">Change title store + mixins</button>
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
  },
  mounted() {
    this.title = this['dashboard/getTitleDashboard'];
  },
};
</script>
