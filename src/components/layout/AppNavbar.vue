<template>
  <div class="app-nav-bar">
    <div class="app-nav-bar__header">
      <p class="app-nav-bar__title">Welcome, {{ user }}.</p>
      <router-link to="/contacts">Contacts</router-link>
      <router-link to="/settings">Settings</router-link>
      <Button @clicked="logOut" secondary>Log Out</Button>
    </div>
  </div>
</template>

<script>
import Button from '@/components/ui/Button.vue'

export default {
  name: "AppNavbar",
  components: {
    Button,
  },
  data() {
    return {
      user: this.$store.state.user.name,
    };
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
  .app-nav-bar__header {
      display: flex;
  }
</style>
