<template>
  <div class="login-box">
    <div class="login-box__header">
      <img alt="Vue logo" class="login-box__logo" src="../assets/logo.png">
      <h1 class="login-box__title">{{ msg }}</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      msg: "Welcome",
    };
  }
};
</script>

<style lang="scss">
  .login-box {
    text-align: center;
    padding: 20px;
    border-radius: 10px;
    background-color: white;
    box-shadow:
      2.8px 2.8px 2.2px rgba(0, 0, 0, 0.02),
      6.7px 6.7px 5.3px rgba(0, 0, 0, 0.028),
      12.5px 12.5px 10px rgba(0, 0, 0, 0.035),
      22.3px 22.3px 17.9px rgba(0, 0, 0, 0.042),
      41.8px 41.8px 33.4px rgba(0, 0, 0, 0.05),
      100px 100px 80px rgba(0, 0, 0, 0.07)
    ;

    &__logo {
      width: 30px;
      margin: 0 auto;
    }

    &__title {
      font-size: 1.5rem;
      letter-spacing: 0.0625em;
      text-transform: uppercase;
    }

    &__header {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  }
</style>
