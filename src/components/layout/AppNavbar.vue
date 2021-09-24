<template>
  <div class="app-nav-bar short-shadow slide-down">
    <div class="app-nav-bar__header">
      <div class="app-nav-bar__header-logo">
        <vue-logo xsmall />
        <div class="app-nav-bar__header-title">
          {{ appName }}
        </div>
      </div>
      <div class="app-nav-bar__header-menu">
        <elm-button @clicked="$emit('settings')" tertiary>{{ userName }}'s Settings</elm-button>
        <elm-button @clicked="logOut" tertiary>Log Out</elm-button>
      </div>
    </div>
  </div>
</template>

<script>
import VueLogo from '@/components/brand/VueLogo.vue'
import ElmButton from '@/components/ui/ElmButton.vue'

export default {
  name: "AppNavbar",
  components: {
    ElmButton,
    VueLogo,
  },
  data() {
    return {
      appName: 'Address Book',
    };
  },
  computed: {
    userName() {
      return this.$store.state.user.name;
    },
  },
  methods: {
    logOut() {
      this.$store.dispatch('LOGOUT')
        .then(() => {
          setTimeout(() => {
            location.reload();
          }, 500);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss">
  .app-nav-bar {
    padding: 10px;
    background-color: $color-white;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;

    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 0 auto;
      max-width: 1200px;

      &-logo {
        display: flex;
        align-items: center;
      }

      &-title {
        font-weight: bold;
        font-size: 1rem;
        margin-left: 0.25rem;
        color: $color-brand-primary-blue;
      }

      &-menu {
        display: flex;
        align-items: center;
      }
    }
  }
</style>
