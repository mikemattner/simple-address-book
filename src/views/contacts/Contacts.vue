<template>
  <div class="contacts-content">
    <div class="contacts__header">
      <h1 class="contacts__title">{{ msg }}</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: "Contacts",
  data() {
    return {
      msg: "Contacts",
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
  
</style>
