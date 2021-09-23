<template>
  <div id="app">
    <component :is="layout">
      <transition name="fade" mode="out-in">
          <router-view :key="$route.fullPath"/>
      </transition>
    </component>
  </div>
</template>

<script>
const default_layout = "login";

export default {
  computed: {
    layout() {
      return (this.$route.meta.layout || default_layout) + '-layout';
    }
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/app.scss';

body {
  margin: 0;
  padding: 0;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
h1,h2,h3,h4 {
  color: black;
  line-height: 1;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .25s ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
