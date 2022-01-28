<template>
  <app-modal v-if="open"
    @close="toggle()"
    :loading="loading"
    title="Update Settings"
    closeButton
    >
    <template v-slot:body>
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
    </template>
    <template v-slot:footer>
      <elm-button type="submit" :loading="loading" @clicked="update()">Update</elm-button>
      <elm-button @clicked="toggle()" tertiary error>Cancel</elm-button>
    </template>
  </app-modal>
</template>

<script>
import AppModal from '@/components/layout/AppModal.vue'
import InputText from '@/components/ui/InputText.vue'
import ElmButton from '@/components/ui/ElmButton.vue'

export default {
  name: "SettingsModal",
  components: {
    AppModal,
    InputText,
    ElmButton,
  },
  props: {
    open: Boolean,
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
      nameInvalid: null,
      passInvalid: null,
      loading: false,
      settings: this.open,
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
    open() { // watch it
      if (this.open) {
        this.settingsInfo.name = this.$store.state.user.name;
        this.settingsInfo.password = this.$store.state.user.password;
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
      this.$emit('toggle');
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
            this.toggle();
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