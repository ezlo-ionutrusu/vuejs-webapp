<template>
  <section class="main-application">
    <page-component></page-component>
  </section>
</template>
<script>
import Page from '@/main/containers/Page/Index.vue';

export default {
  components: {
    'page-component': Page,
  },
};
</script>
<style lang="scss">
@import "@skin/styles/globals.scss";
</style>
