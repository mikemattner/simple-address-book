<template>
  <div class="contacts-content">
    <div class="contacts-content__header">
      <h1 class="contacts-content__title">{{ pageTitle }}</h1>
      <elm-button v-if="contacts.length > 0" @clicked="toggleAddModal()">Add Contact</elm-button>
    </div>
    <div v-if="contacts.length < 1" class="contacts-content__empty">
      <h3>This is suspiciously empty.</h3>
      <p>Start adding contacts to keep track of who you know.</p>
      <elm-button @clicked="toggleAddModal()">Add Contact</elm-button>
    </div>
    <div v-if="contacts.length > 0" class="contacts-content__list long-shadow">
      <list-view-item
        v-for="(contact, index) in contacts"
        :item="contact"
        @details="viewDetails(contact)"
        @delete="removeFromContacts(contact)"
        :key="contacts.indexOf(contact)" />
    </div>
    <app-modal v-if="addContact"
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
        </div>
        <div class="settings-form__button-container">
          <elm-button type="submit" :loading="loading">Save</elm-button>
          <elm-button @clicked="toggleAddModal()" tertiary error>Cancel</elm-button>
        </div>
      </form>
    </app-modal>
  </div>
</template>

<script>
import AppModal from '@/components/layout/AppModal.vue'
import ElmButton from '@/components/ui/ElmButton.vue'
import ListViewItem from '@/views/contacts/components/ListViewItem.vue'
import InputText from '@/components/ui/InputText.vue'
import InputSelect from '@/components/ui/InputSelect.vue'

export default {
  name: "Contacts",
  components: {
    AppModal,
    ElmButton,
    ListViewItem,
    InputText,
    InputSelect,
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
      phoneNumbers: [],
      loading: false,
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
    },
    removeFromContacts(contact) {
      this.contacts.splice(this.contacts.indexOf(contact), 1);
      const contacts = this.contacts;
      this.$store.dispatch('SAVE_CONTACTS', contacts)
        .then(() => {
          
        })
        .catch((error) => {
          console.log(error);
        });
    },
    addToContacts() {
      // this.validateName(this.settingsInfo.name);
      // this.validatePassword(this.settingsInfo.password);
      
      // if (this.nameInvalid || this.passInvalid) {
      //   return;
      // }

      this.loading = true;
      this.contacts.indexOf(this.contact) === -1 ? this.contacts.push(this.contact) : console.log('Why did you add this again?');

      let contacts = this.contacts;
      this.$store.dispatch('SAVE_CONTACTS', contacts)
        .then(() => {
          setTimeout(() => {
            this.toggleAddModal();
            this.loading = false;
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
.contacts-content {
  padding: 80px 20px;
  overflow: visible;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__list {
    background-color: $color-white;
    border-radius: 10px;
  }

  &__empty {
    padding: 2rem;
    background-color: rgba($color-white, 0.5);
    border-radius: 10px;
    border: 1px dashed tint($color-brand-primary-blue, 70%);
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 300px;

    h3 {
      margin-bottom: 0;
    }
  }
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
}
</style>
