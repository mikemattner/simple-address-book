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
        <div class="add-contacts-form__field-label">
          Contact Details
        </div>
        <div class="add-contacts-form__field-info">
          <input-select
            id="salutation" 
            name="salutation"
            label="Salutation"
            empty="Select.."
            :options="['M','Mr.','Mrs.','Ms.']"
            v-model="contact.salutation" />
          <input-text
            :error="firstNameInvalid"
            id="first-name" 
            name="firstName"
            :message="required"
            type="text" 
            label="First Name"
            required
            v-model="contact.firstName" />
          <input-text
            :error="lastNameInvalid"
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
        </div>
        <div class="add-contacts-form__field-label">
          Contact Phone Numbers
        </div>
        <div 
          class="add-contacts-form__field-numbers"
          v-for="(phone, index) in phoneNumbers"
          :key="`phone-${index}`">
          <div class="number-container">
            <input-select
              :id="`phonetype-${index}`"
              :name="`phonetype-${index}`"
              :message="required"
              label="Type"
              empty="Select.."
              :options="['Work','Home','Cell']"
              v-model="phoneNumbers[index].type" />
            <input-text
              :error="phoneValidation[index].numberInvalid"
              :id="`phonenumber-${index}`"
              :name="`phonenumber-${index}`"
              :message="required"
              type="text" 
              label="Phone Number"
              required
              v-model="phoneNumbers[index].number" />
            <input-checkbox
              :id="`phoneprimary-${index}`"
              :name="`phoneprimary-${index}`"
              label="Primary?"
              inputValue="true"
              v-model="phoneNumbers[index].primary" />
          </div>
          <div class="button-container">
            <elm-button @clicked="addNumber()" success>+</elm-button>
            <elm-button v-if="phoneNumbers.length > 1" @clicked="removeNumber(index)" error>-</elm-button>
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
import InputCheckbox from '@/components/ui/InputCheckbox.vue'

export default {
  name: "Contacts",
  components: {
    AppModal,
    ElmButton,
    InputText,
    InputSelect,
    InputCheckbox,
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
      phoneValidation: [{
        numberInvalid: false,
      }],
      phoneErrors: [],
      loading: false,
      firstNameInvalid: null,
      lastNameInvalid: null,
      phoneNumberInvalid: null,
    };
  },
  computed: {
    sortedContacts(){
      return this.contacts.sort((a, b) => a.lastName > b.lastName );
    },
    firstName() {
      return this.contact.firstName;
    },
    lastName() {
      return this.contact.lastName;
    },
  },
  watch: {
    firstName(value){
      this.contact.firstName = value;
      if (this.firstNameInvalid) {
        this.validateFirstName(value);      
      }
    },
    lastName(value){
      this.contact.lastName = value;
      if (this.lastNameInvalid) {
        this.validateLastName(value);  
      }    
    },
  },
  methods: {
    validateFirstName(value) {
      if (value.length < 2) {
        this.firstNameInvalid = true;
      } else {
        this.firstNameInvalid = false;
      }
    },
    validateLastName(value) {
      if (value.length < 2) {
        this.lastNameInvalid = true;
      } else {
        this.lastNameInvalid = false;
      }
    },
    validateNumber(value, index) {
      if (value.length < 2) {
        this.phoneValidation[index].numberInvalid = true;
      } else {
        this.phoneValidation[index].numberInvalid = false;
      }
    },
    addNumber() {
      this.phoneNumbers.push({
        type: '',
        number: '',
        primary: 'false',
      });
      this.phoneValidation.push({
        numberInvalid: false,
      });
    },
    removeNumber(index) {
      this.phoneNumbers.splice(index, 1);
      this.phoneValidation.splice(index, 1);
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
      this.phoneNumbers = [{
        type: '',
        number: '',
        primary: 'false',
      }];
      this.numberInvalid = [{
        numberInvalid: false,
      }];
      this.firstNameInvalid = null;
      this.lastNameInvalid = null;
      this.$emit('toggle');
    },
    addToContacts() {
      this.validateFirstName(this.contact.firstName);
      this.validateLastName(this.contact.lastName);
      
      this.phoneErrors = []; 
      this.phoneNumbers.forEach((item, index) => {
        this.validateNumber(item.number, index);
        this.phoneErrors.push(this.phoneValidation[index].numberInvalid);
      });

      let phoneValid = this.phoneErrors.includes(true);

      if (this.firstNameInvalid || this.lastNameInvalid || phoneValid) {
        return;
      }

      this.loading = true;
      this.contact.phoneNumbers = this.phoneNumbers
      this.contacts.indexOf(this.contact) === -1 ? this.contacts.push(this.contact) : console.log('Why did you add this again?');

      let contacts = this.contacts;
      this.$store.dispatch('SAVE_CONTACTS', contacts)
        .then(() => {
          setTimeout(() => {
            this.loading = false;
            this.toggleAddModal();
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
  .add-contacts-fake-photo {
    padding: 20px;
    background-color: tint($color-brand-secondary-blue, 70%);
    margin-bottom: 1rem;
    text-align: center;
    
    &:hover {
      cursor: not-allowed;
    }

    img {
      width: 70px;
      height: 70px;
      overflow: hidden;
      border-radius: 50%;
      margin-right: 2rem;
      margin: 0 auto;
    }
  }

  &__field-label {
    font-weight: 700;
    color: $color-brand-primary-blue;
    margin-bottom: 0.5rem;
  }
  &__field-numbers {
    display: flex;
    align-items: stretch;

    @include max-media(500px) {
      flex-direction: column;
    }

    .button-container {
      display: flex;
      align-items: flex-end;
      padding-bottom: 0.5rem;

      @include min-media(501px) {
        margin-left: 0.5rem;
        .button {
          margin-bottom: 0;
        }
      }
    }
    .number-container {
      display: flex;
      align-items: stretch;
      flex-grow: 1;

      @include max-media(500px) {
        flex-direction: column;
      }
    }

    @include min-media(501px) {
      .input-text-field {
        flex: 0 0 33%;
        margin-right: 0.5rem;
      }
      .input-select-field {
        flex: 0 0 100px;
        margin-right: 0.5rem;
      }
      .input-checkbox-field {
        flex: 0 0 100px;
        padding-top: 1rem;
      }
    }
  }
}
</style>
