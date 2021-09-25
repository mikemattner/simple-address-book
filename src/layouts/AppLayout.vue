<template>
  <div class="app-layout">
    <app-navbar @settings="toggle()" />
    <slot />
    <app-modal v-if="settings"
      @close="toggle()"
      :loading="loading"
      title="Update Settings"
      closeButton
      >
      <form @submit.prevent="update" class="settings-form">
        <div class="settings-form__fields">
          <input-text
            :error="nameInvalid"
            id="login-name" 
            name="name"
            :message="msg.name"
            type="text" 
            label="Name"
            required
            v-model="settingsInfo.name" />
          <input-text
            :error="passInvalid"
            id="login-password" 
            name="password" 
            :message="msg.password"
            type="password" 
            label="Password" 
            required
            v-model="settingsInfo.password" />
        </div>
        <div class="settings-form__button-container">
          <elm-button type="submit" :loading="loading">Update</elm-button>
          <elm-button @clicked="toggle()" tertiary error>Cancel</elm-button>
        </div>
      </form>
    </app-modal>
  </div>
</template>

<script>
import AppNavbar from '@/components/layout/AppNavbar.vue'
import AppModal from '@/components/layout/AppModal.vue'
import InputText from '@/components/ui/InputText.vue'
import ElmButton from '@/components/ui/ElmButton.vue'

export default {
  name: "AppLayout",
  components: {
    AppNavbar,
    AppModal,
    InputText,
    ElmButton,
  },
  data() {
    return {
      msg: {
        name: "",
        password: "",
      },
      settingsInfo: {
        name: '',
        password: '',
      },
      settings: false,
      nameInvalid: null,
      passInvalid: null,
      loading: false,
    };
  },
  computed: {
    name() {
      return this.settingsInfo.name;
    },
    password() {
      return this.settingsInfo.password;
    },
  },
  watch: {
    name(value){
      this.settingsInfo.name = value;
      if (this.nameInvalid) {
        this.validateName(value);      
      }
    },
    password(value){
      this.settingsInfo.password = value;
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
    toggle() {
      this.settings = !this.settings
      
      if (this.settings) {
        this.settingsInfo.name = this.$store.state.user.name;
        this.settingsInfo.password = this.$store.state.user.password;
      }
    },
    update() {
      this.validateName(this.settingsInfo.name);
      this.validatePassword(this.settingsInfo.password);
      
      if (this.nameInvalid || this.passInvalid) {
        return;
      }

      this.loading = true;

      let user = this.settingsInfo;
      this.$store.dispatch('UPDATE_SETTINGS', user)
        .then(() => {
          setTimeout(() => {
            this.loading = false;
            this.settings = !this.settings
          }, 500);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
};
</script>

<style lang="scss">
  .app-layout {
    position: relative;
    max-width: 1000px;
    margin: 0 auto;
  }
  .settings-form {
    &__button-container {
      display: flex;
      align-items: center;

      @include max-media(540px) {
        flex-direction: column;
        align-items: stretch;
      }
    }
  }
</style>