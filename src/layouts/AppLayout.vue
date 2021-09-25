<template>
  <div class="app-layout">
    <app-navbar @settings="toggle()" />
    <slot />
    <settings-modal @toggle="toggle()" :open="settings" />
  </div>
</template>

<script>
import AppNavbar from '@/components/layout/AppNavbar.vue'
import SettingsModal from '@/components/settings/SettingsModal.vue'

export default {
  name: "AppLayout",
  components: {
    AppNavbar,
    SettingsModal,
  },
  data() {
    return {
      settings: false,
    };
  },
  methods: {
    toggle() {
      this.settings = !this.settings
    },
  },
};
</script>

<style lang="scss">
  .app-layout {
    position: relative;
    max-width: 1000px;
    margin: 0 auto;
  }
</style>