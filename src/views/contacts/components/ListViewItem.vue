<template>
  <div class="list-view-item">
    <div class="list-view-item__details">
      <div class="list-view-item__details-name">
        {{ item.firstName }} {{ item.lastName }}
      </div>
      <div v-for="(phoneNumber, index) in item.phoneNumbers" class="list-view-item__details-number">
        <span v-if="phoneNumber.primary">
          {{ phoneNumber.type }}: {{ phoneNumber.number }}
        </span>
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
  }
};
</script>

<style lang="scss">
.list-view-item {
  padding: 20px;
  border-top: 1px solid tint($color-brand-primary-blue, 90%);
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  &:first-child {
    border-top: none;
  }

  &__details-name {
    font-weight: 700;
    color: $color-brand-primary-blue;
  }

  &__details-number {
    font-size: 0.75rem;
  }

  &__actions {
    display: flex;
    align-items: center;
  }  
}
</style>
