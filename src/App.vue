<template web>
  <section class="main-application">
    <page-component></page-component>
  </section>
</template>
<template native>
  <Page>
    <ActionBar title="MyApp"/>
    <ScrollView>
      <StackLayout class="home-panel">
        <!--Add your page content here-->
        <Label textWrap="true" text="Play with NativeScript!" class="h2 description-label"/>
        <Label
          textWrap="true"
          text="Write code in the editor or drag and drop components to build a NativeScript mobile application."
          class="h2 description-label"
        />
        <Label
          textWrap="true"
          text="Scan the QR code with your mobile device and watch the changes sync live while you play with the code."
          class="h2 description-label"
        />
        <Button text="Button" @tap="onButtonTap"/>
      </StackLayout>
    </ScrollView>
  </Page>
</template>
<script>
import MainPage from '@/main/containers/Page/Index.vue';
import { getAuthProvider } from '@/API/';

// const { VUE_APP_MODE } = process.env;
const { alert } = require('tns-core-modules/ui/dialogs');

export default {
  components: {
    'page-component': MainPage,
  },
  mounted() {
    // eslint-disable-next-line no-console
    getAuthProvider().auth.connect().then((response) => { console.log(response); });
  },
  methods:
  {
    onButtonTap() {
      alert({
        title: 'Your title',
        message: 'Your message',
        okButtonText: 'Your button text',
      }).then(() => {
        console.log('The user closed the alert.');
      });
    },
  },
};
</script>
<style lang="scss">
@import "@skin/styles/globals.scss";
</style>
