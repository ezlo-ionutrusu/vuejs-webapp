<template>
  <section class="header">
    <header-component :msg="msg"></header-component>
  </section>
</template>
<script>
export default {
  data() {
    return {
      msg: 'Header',
    };
  },
  components: {
    'header-component': () => import('@/main/components/Header/Index'),
  },
};
</script>
