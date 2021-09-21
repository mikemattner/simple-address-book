<template>
  <div class="login-box long-shadow">
    <div class="login-box__header">
      <Logo small />
      <h1 class="login-box__title">{{ msg }}, {{ user }}.</h1>
      <p class="login-box__body">{{ body }}</p>
      <form @submit.prevent="loginToApp">
        <div>
          <label>Name</label>
          <input v-model="login.name" />
        </div>
        <div>
          <label>Password</label>
          <input v-model="login.password" />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  </div>
</template>

<script>
import Logo from '@/components/brand/Logo.vue'
export default {
  name: "Login",
  components: {
    Logo,
  },
  data() {
    return {
      msg: "Welcome",
      body: "Let's manage your contacts today.",
      user: this.$store.state.user.name,
      login: {
        name: "",
        password: "",
      },
      formValid: false,
    };
  },
  methods: {
    loginToApp() {
      if (!this.formValid) {
        return;
      }
      const { name, address, phone } = this.contact;
      this.contacts.push({ id: uuidv4(), name, address, phone });
    },
  },
};
</script>

<style lang="scss">
  .login-box {
    text-align: center;
    padding: 20px;
    border-radius: 10px;
    background-color: white;

    &__title {
      margin: 0;
      color: $color-brand-primary-blue;
    }
    &__body {
      margin-top: 0;
    }

    &__header {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  }
</style>
