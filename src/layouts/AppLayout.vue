<template>
  <div class="app-layout">
    <app-navbar />
    <slot />
  </div>
</template>

<script>
import AppNavbar from '@/components/layout/AppNavbar.vue'

export default {
  name: "AppLayout",
  components: {
    AppNavbar,
  },
};
</script>

<style lang="scss">

</style>