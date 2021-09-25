<template>
  <div class="list-view-item">
    <div class="list-view-item__details">
      <div class="list-view-item__details-photo">
        <img :src="item.photo" alt="" />
      </div>
      <div class="list-view-item__details-preview">
        <div class="list-view-item__details-name">
          {{ item.salutation }} {{ item.firstName }} {{ item.lastName }}
        </div>
        <div class="list-view-item__details-company">
          {{ item.companyName }}
        </div>
        <div v-for="(phoneNumber, index) in item.phoneNumbers" class="list-view-item__details-number">
          <span v-if="phoneNumber.primary">
            <span v-if="phoneNumber.type != ''" :class="[
                'item-chip',
                phoneNumber.type == 'Work' ? 'item-chip--work' : '',
                phoneNumber.type == 'Cell' ? 'item-chip--cell' : '',
                phoneNumber.type == 'Home' ? 'item-chip--home' : '',
              ]">{{ phoneNumber.type }}</span> 
            {{ phoneNumber.number }}
          </span>
        </div>
      </div>
    </div>
    <div class="list-view-item__actions">
      <elm-button @clicked="$emit('details')" tertiary>Details</elm-button>
      <elm-button @clicked="$emit('delete')" tertiary error>Delete</elm-button>
    </div>
  </div>
</template>

<script>
import ElmButton from '@/components/ui/ElmButton.vue'

export default {
  name: 'ListView',
  components: {
    ElmButton,
  },
  props: {
    item: Object,
  },
};
</script>

<style lang="scss">
.list-view-item {
  padding: 20px;
  border-top: 1px solid tint($color-brand-primary-blue, 90%);
  display: flex;
  align-items: center;
  justify-content: flex-start;
  
  &:first-child {
    border-top: none;
  }

  &__details {
    display: flex;
    align-items: center;
  }

  &__details-name {
    font-weight: 700;
    color: $color-brand-primary-blue;
  }
  
  &__details-photo {
    width: 70px;
    height: 70px;
    overflow: hidden;
    border-radius: 50%;
    margin-right: 2rem;
  }

  &__details-number {
    font-size: 0.75rem;
  }

  &__actions {
    display: flex;
    align-items: center;
  }

  .item-chip {
    display: inline-flex;
    padding: 5px;
    border-radius: 2px;
    font-size: 0.675rem;
    text-transform: uppercase;
    color: $color-white;

    &--work {
      background-color: $color-bright-blue;
    }
    &--cell {
      background-color: $color-bright-green;
    }
    &--home {
      background-color: $color-brand-secondary-blue;
    }
  }
  &__actions {
    margin-left: auto;
  }
}
</style>
