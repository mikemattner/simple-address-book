<template>
  <div class="contacts-content">
    <div class="contacts-content__header">
      <h1 class="contacts-content__title">{{ pageTitle }}</h1>
      <elm-button v-if="contacts.length > 0" @clicked="addContactModal()">Add Contact</elm-button>
    </div>
    <div v-if="contacts.length < 1" class="contacts-content__empty">
      <h3>This is suspiciously empty.</h3>
      <p>Start adding contacts to keep track of who you know.</p>
      <elm-button @clicked="addContactModal()">Add Contact</elm-button>
    </div>
    <div v-if="contacts.length > 0" class="contacts-content__list long-shadow">
      <list-view-item
        v-for="(contact, index) in contacts"
        :item="contact"
        @details="viewDetails(contact)"
        @delete="removeFromContacts(contact)"
        :key="contacts.indexOf(contact)" />
    </div>
  </div>
</template>

<script>
import ElmButton from '@/components/ui/ElmButton.vue'
import ListViewItem from '@/views/contacts/components/ListViewItem.vue'

export default {
  name: "Contacts",
  components: {
    ElmButton,
    ListViewItem
  },
  data() {
    return {
      pageTitle: "Contacts",
      contacts: this.$store.state.contacts,
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
    removeFromContacts(contact) {
      this.contacts.splice(this.contacts.indexOf(contact), 1);
    },
  },
};
</script>

<style lang="scss">
.contacts-content {
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
}
</style>
