<template>
  <section>
    <h4>Store modification</h4>
    <div>
      <div>
        <img src="@/assets/logo.png" v-if="this['main/getLogoVisibility']" width="100">
      </div>
      <br>
      <button @click="toggleLogoVisibility">Hide logo(modify the store)</button>
    </div>
    <br>
    <br>
    <h4>Svg import as components / skins folder</h4>
    <home-logo class="svg"/>
    <device-logo class="svg"/>
  </section>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  computed:
  {
    ...mapGetters(['main/getLogoVisibility']),
  },
  components:
  {
    'home-logo': () => import('@skin/img/main/icons/Home.vue'),
    'device-logo': () => import('@skin/img/main/icons/Device.vue'),
  },
  methods:
  {
    toggleLogoVisibility() {
      if (this['main/getLogoVisibility']) { this.$store.dispatch('main/logoVisibility', false); } else { this.$store.dispatch('main/logoVisibility', true); }
    },
  },
};
</script>
