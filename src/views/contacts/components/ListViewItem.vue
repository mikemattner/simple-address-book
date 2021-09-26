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
          <span v-if="phoneNumber.primary == 'true'">
            {{ phoneNumber.number }}
          </span>
        </div>
      </div>
    </div>
    <div class="list-view-item__actions">
      <elm-button @clicked="$emit('details')" secondary>Details</elm-button>
      <elm-button @clicked="$emit('delete')" secondary error>Delete</elm-button>
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
  transition: all 0.25s ease-in-out;

  @include between-media(801px, 950px) {
    flex-direction: column;
    align-items: flex-start;
  }

  @include max-media(500px) {
    flex-direction: column;
    align-items: flex-start;
  }
  
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
    width: 50px;
    height: 50px;
    overflow: hidden;
    border-radius: 50%;
    margin-right: 1rem;
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
    @include min-media(951px) {
      margin-left: auto;
    }
    @include between-media(501px, 800px) {
      margin-left: auto;
    }
  }
}
</style>
