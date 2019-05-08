<template>
  <section class="main">
    <left-sidebar-view></left-sidebar-view>
    <section class="main-contents">
      <header-view></header-view>
      <router-view/>
    </section>
  </section>
</template>
<script>
export default {
  components: {
    'left-sidebar-view': () => import('@/main/containers/LeftSidebar/Index'),
    'header-view': () => import('@/main/containers/Header/Index'),
  },
};
</script>
<style lang="scss">
@import "./styles.module.scss";
</style>
