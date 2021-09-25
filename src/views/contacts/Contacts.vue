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
    <div v-if="contacts.length > 0" class="contacts-content__list long-shadow">
      <list-view-item
        v-for="(contact, index) in sortedContacts"
        :item="contact"
        @details="viewDetails(contact)"
        @delete="removeFromContacts(contact)"
        :key="contacts.indexOf(contact)" />
    </div>
    <contact-modal @toggle="toggleAddModal()" :open="addContact" />
  </div>
</template>

<script>
import ContactModal from '@/views/contacts/components/ContactModal.vue'
import ElmButton from '@/components/ui/ElmButton.vue'
import ListViewItem from '@/views/contacts/components/ListViewItem.vue'

export default {
  name: "Contacts",
  components: {
    ContactModal,
    ElmButton,
    ListViewItem,
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
