<template>
  <app-modal v-if="open"
    @close="toggleAddModal()"
    :loading="loading"
    title="Add Contact"
    modalWidth="600"
    closeButton
    >
    <form @submit.prevent="addToContacts" class="add-contacts-form">
      <div class="add-contacts-form__fields">
        <div class="add-contacts-fake-photo">
          <img :src="contact.photo" alt="" />
          Add photo
        </div>
        <input-select
          id="salutation" 
          name="salutation"
          :message="required"
          label="Salutation"
          empty="Select.."
          :options="['Mr.','Mrs.','Ms.']"
          v-model="contact.salutation" />
        <input-text
          :error="nameInvalid"
          id="first-name" 
          name="firstName"
          :message="required"
          type="text" 
          label="First Name"
          required
          v-model="contact.firstName" />
        <input-text
          :error="nameInvalid"
          id="last-name" 
          name="lastName" 
          :message="required"
          type="text" 
          label="Last Name"
          required
          v-model="contact.lastName" />
        <input-text
          id="company-name" 
          name="companyName" 
          type="text" 
          label="Company Name"
          v-model="contact.companyName" />
        <div 
          class="add-contacts-form__field-numbers"
          v-for="(phone, index) in phoneNumbers"
          :key="`phone-${index}`">
          <input-select
            :id="`phonetype-${index}`"
            :name="`phonetype-${index}`"
            :message="required"
            label="Type"
            empty="Select.."
            :options="['Work','Home','Cell']"
            v-model="phoneNumbers[index].type" />
          <input-text
            :error="phoneInavlid"
            :id="`phonenumber-${index}`"
            :name="`phonenumber-${index}`"
            :message="required"
            type="text" 
            label="Phone Number"
            required
            v-model="phoneNumbers[index].number" />
          
          <div class="button-container">
            <elm-button @clicked="addNumber()" tertiary success>+</elm-button>
            <elm-button v-if="phoneNumbers.length > 1" @clicked="removeNumber(index)" tertiary error>-</elm-button>
          </div>
        </div>
      </div>
      <div class="settings-form__button-container">
        <elm-button type="submit" :loading="loading">Save</elm-button>
        <elm-button @clicked="toggleAddModal()" tertiary error>Cancel</elm-button>
      </div>
    </form>
  </app-modal>
</template>

<script>
import AppModal from '@/components/layout/AppModal.vue'
import ElmButton from '@/components/ui/ElmButton.vue'
import InputText from '@/components/ui/InputText.vue'
import InputSelect from '@/components/ui/InputSelect.vue'

export default {
  name: "Contacts",
  components: {
    AppModal,
    ElmButton,
    InputText,
    InputSelect,
  },
  props: {
    open: Boolean,
  },
  data() {
    return {
      pageTitle: "Contacts",
      contacts: this.$store.state.contacts,
      required: 'Required',
      addContact: false,
      contact: {
        photo: '/images/profile.jpg',
        salutation: '',
        firstName: '',
        lastName: '',
        companyName: '',
        phoneNumbers: [],
      },
      phoneNumbers: [
        {
          type: '',
          number: '',
          primary: false,
        },
      ],
      loading: false,
      nameInvalid: false,
    };
  },
  computed: {
    userName() {
      return this.$store.state.user.name;
    },
    sortedContacts(){
      return this.contacts.sort((a, b) => a.lastName > b.lastName );
    }
  },
  methods: {
    addNumber() {
      this.phoneNumbers.push({
        type: '',
        number: '',
        primary: false,
      });
    },
    removeNumber(index) {
      this.phoneNumbers.splice(index, 1);
    },
    toggleAddModal() {
      this.addContact = !this.addContact;
      this.contact = {
        photo: '/images/profile.jpg',
        salutation: '',
        firstName: '',
        lastName: '',
        companyName: '',
        phoneNumbers: [],
      };
      this.phoneNumbers = {
        type: '',
        number: '',
        primary: false,
      };
      this.$emit('toggle');
    },
    addToContacts() {
      // this.validateName(this.settingsInfo.name);
      // this.validatePassword(this.settingsInfo.password);
      
      // if (this.nameInvalid || this.passInvalid) {
      //   return;
      // }

      this.loading = true;
      this.contact.phoneNumbers = this.phoneNumbers
      this.contacts.indexOf(this.contact) === -1 ? this.contacts.push(this.contact) : console.log('Why did you add this again?');

      let contacts = this.contacts;
      this.$store.dispatch('SAVE_CONTACTS', contacts)
        .then(() => {
          setTimeout(() => {
            this.loading = false;
            this.toggleAddModal();
            this.contact = {
              photo: '/images/profile.jpg',
              salutation: '',
              firstName: '',
              lastName: '',
              companyName: '',
              phoneNumbers: [],
            }
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
.add-contacts-form {
  &__field-numbers {
    display: flex;
    align-items: flex-end;

    .button-container {
      display: flex;
      align-items: flex-end;
      padding-bottom: 0.5rem;
      margin-left: 0.5rem;

      .button {
        margin-bottom: 0;
      }
    }
    .input-text-field {
      flex: 0 0 33%;
    }
    .input-select-field {
      flex: 0 0 100px;
      margin-right: 0.5rem;
    }
  }
}
</style>
