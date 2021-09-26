<template>
  <div class="contacts-content">
    <div class="contacts-content__header">
      <h1 class="contacts-content__title">{{ pageTitle }}</h1>
      <elm-button v-if="contacts.length > 0" @clicked="toggleAddModal()">Add Contact</elm-button>
    </div>
    <div v-if="contacts.length < 1" class="contacts-content__empty">
      <h3>{{ empty.title }}</h3>
      <p>{{ empty.body }}</p>
      <elm-button @clicked="toggleAddModal()">Add Contact</elm-button>
    </div>
    <div v-if="contacts.length > 0" class="contacts-content__view">
      <details-view :open="viewContact" :item="contact" @close="toggleDetails()" />
      <div class="contacts-content__list long-shadow">
        <list-view-item
          v-for="(contact, index) in sortedContacts"
          :item="contact"
          @details="viewDetails(contact)"
          @delete="removeFromContacts(contact)"
          :key="contacts.indexOf(contact)" />
      </div>
    </div>
    <contact-modal @toggle="toggleAddModal()" :open="addContact" />
  </div>
</template>

<script>
import ContactModal from '@/views/contacts/components/ContactModal.vue'
import ElmButton from '@/components/ui/ElmButton.vue'
import ListViewItem from '@/views/contacts/components/ListViewItem.vue'
import DetailsView from '@/views/contacts/components/DetailsView.vue'

export default {
  name: "Contacts",
  components: {
    ContactModal,
    ElmButton,
    ListViewItem,
    DetailsView,
  },
  data() {
    return {
      pageTitle: "Contacts",
      empty: {
        title: "This is suspiciously empty.",
        body: "Start adding contacts to keep track of who you know.",
      },
      contacts: this.$store.state.contacts,
      addContact: false,
      contact: null,
      viewContact: false,
    };
  },
  computed: {
    sortedContacts(){
      return this.contacts.sort((a, b) => a.lastName > b.lastName );
    }
  },
  watch: {
    contacts() {
      return this.$store.state.contacts;
    },
  },
  methods: {
    toggleAddModal() {
      this.addContact = !this.addContact;
    },
    toggleDetails() {
      this.viewContact = !this.viewContact;
    },
    viewDetails(contact) {
      this.contact = contact;
      if (!this.viewContact) {
        this.toggleDetails();
      }
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
  },
};
</script>

<style lang="scss">
.contacts-content {
  padding: 80px 20px;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__view {
    display: flex;
    align-items: flex-start;
    height: 100%;
  }

  &__list {
    background-color: $color-white;
    border-radius: 10px;
    flex-grow: 1;
    transition: all 0.25s ease-in-out;
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
}
</style>
