<template web>
  <section class="main-application">
    <page-component></page-component>
  </section>
</template>
<template native>
  <Page>
    <Label textWrap="true" text="Play with NativeScript demo!"/>
  </Page>
</template>
<script>
import MainPage from '@/main/containers/Page/Index.vue';
import { getAuthProvider } from '@/API/';

const { VUE_APP_MODE } = process.env;

export default {
  components: {
    'page-component': MainPage,
  },
  mounted() {
    // eslint-disable-next-line no-console
    getAuthProvider().auth.connect().then((response) => { console.log(response); });
  },
};
</script>
<style lang="scss">
@import "@skin/styles/globals.scss";
</style>
