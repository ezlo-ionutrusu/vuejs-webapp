<template>
  <section class="main-application">
    <page-component></page-component>
  </section>
</template>
<script>
import Page from '@/main/containers/Page/Index.vue';
import { getAuthProvider } from '@/API/';

export default {
  components: {
    'page-component': Page,
  },
  mounted() {
    try {
      this.loginInformation = 'Connecting...';
      getAuthProvider().auth.connect().then((response) => { console.log(response); });
    } catch (err) { console.log(err); }
  },
};
</script>
<style lang="scss">
@import "@skin/styles/globals.scss";
</style>
