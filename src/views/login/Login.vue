<template>
  <div class="login-box slide-up long-shadow">
    <div class="login-box__header">
      <div class="login-box__header-logo">
        <vue-logo small />
      </div>
      <div class="login-box__header-container">
        <h1 class="login-box__title">{{ greeting }}</h1>
        <p class="login-box__body">{{ body }}</p>
      </div>
    </div>
    <div class="login-box__form">
      <form @submit.prevent="login">
        <input-text
          :error="nameInvalid"
          id="login-name" 
          name="name"
          :message="msg.name"
          type="text" 
          label="Name"
          required 
          v-model="userLogin.name" />
        <input-text
          :error="passInvalid"
          id="login-password" 
          name="password" 
          :message="msg.password"
          type="password" 
          label="Password" 
          required
          v-model="userLogin.password" />
        <div class="login-box__form-button-container">
          <Button 
            type="submit"
            block
            :loading="loading"
          >
            Login
          </Button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import VueLogo from '@/components/brand/VueLogo.vue'
import InputText from '@/components/ui/InputText.vue'
import Button from '@/components/ui/Button.vue'

export default {
  name: "Login",
  components: {
    VueLogo,
    InputText,
    Button,
  },
  data() {
    return {
      greeting: "Welcome, friend.",
      msg: {
        name: "",
        password: "",
      },
      body: "Let us manage thine contacts.",
      userLogin: {
        name: "",
        password: "",
      },
      nameInvalid: null,
      passInvalid: null,
      loading: false,
    };
  },
  computed: {
    name() {
      return this.userLogin.name;
    },
    password() {
      return this.userLogin.password;
    },
  },
  watch: {
    name(value){
      this.userLogin.name = value;
      if (this.nameInvalid) {
        this.validateName(value);      
      }
    },
    password(value){
      this.userLogin.password = value;
      if (this.passInvalid) {
        this.validatePassword(value);  
      }    
    },
  },
  methods: {
    validateName(value) {
      if (value.length < 2) {
        this.nameInvalid = true;
        this.msg.name = "Provide that name!";
      } else {
        this.nameInvalid = false;
      }
    },
    validatePassword(value) {
      if (value.length < 1) {
        this.passInvalid = true;
        this.msg.password = "We only require ONE character...";
      } else {
        this.passInvalid = false;
      }
    },
    login() {
      this.validateName(this.userLogin.name);
      this.validatePassword(this.userLogin.password);
      
      if (this.nameInvalid || this.passInvalid) {
        return;
      }

      this.loading = true;

      let user = this.userLogin;
      this.$store.dispatch('LOGIN', user)
        .then(() => {
          setTimeout(() => {
            this.$router.push({ path: '/contacts' });
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
  .login-box {
    border-radius: 10px;
    background-color: $color-white;
    overflow: hidden;
    max-width: 20rem;
    width: 100%;

    &__title {
      margin: 0;
      color: $color-cool-gray;
      font-size: 1rem;
    }
    &__body {
      font-size: 0.75rem;
      margin: 0;
      color: $color-cool-gray;
    }

    &__header {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 20px;
      background: $color-brand-secondary-blue;
      text-align: center;

      &-logo {
        width: 60px;
        height: 60px;
        flex: 0 0 60px;
        padding-top: 0.25rem;
        margin-bottom: 0.25rem;
        border-radius: 50%;
        background: $color-white;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      &-container {
       
      }
    }

    &__form {
      padding: 20px;

      &-button-container {
        padding-top: 0.75rem;
      }
    }
  }
</style>
