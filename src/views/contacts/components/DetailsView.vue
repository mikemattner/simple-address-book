<template>
  <div class="detail-view-item slide-right long-shadow" v-if="open">
    <elm-button @clicked="$emit('close')" title="Close Details" class="details-close" tertiary>
      <span class="visually-hidden">Close</span> <close-icon />
    </elm-button>
    <div class="detail-view-item__details">
      <div class="detail-view-item__details-photo">
        <img :src="item.photo" alt="" />
      </div>

      <div class="detail-view-item__details-preview">
        
        <div class="detail-view-item__details-name">
          {{ item.salutation }} {{ item.firstName }} {{ item.lastName }}
        </div>

        <div class="detail-view-item__details-company">
          {{ item.companyName }}
        </div>
        
        <div v-for="(phoneNumber, index) in item.phoneNumbers" class="detail-view-item__details-number">
            <span>
              <span :class="[
                'item-chip',
                phoneNumber.type == 'Work' ? 'item-chip--work' : '',
                phoneNumber.type == 'Cell' ? 'item-chip--cell' : '',
                phoneNumber.type == 'Home' ? 'item-chip--home' : '',
              ]">{{ phoneNumber.type }}</span> 
              <span v-if="phoneNumber.primary == 'true'" 
                :class="[
                'primary-item',
                  phoneNumber.type == 'Work' ? 'primary-item--work' : '',
                  phoneNumber.type == 'Cell' ? 'primary-item--cell' : '',
                  phoneNumber.type == 'Home' ? 'primary-item--home' : '',
                ]">★</span>
            </span>
            <span class="detail-view-item__details-number-phone">{{ phoneNumber.number }}</span>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import ElmButton from '@/components/ui/ElmButton.vue'
import CloseIcon from '@/assets/media/CloseIcon.svg'

export default {
  name: 'DetailsView',
  components: {
    ElmButton,
    CloseIcon,
  },
  props: {
    item: Object,
    open: Boolean,
  },
};
</script>

<style lang="scss">
.detail-view-item {
  background-color: $color-white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  text-align: center;

  @include min-media(801px) {
    margin-right: 2rem;
    padding: 20px;
    flex: 0 0 300px;
    position: sticky;
    top: 80px;
  }

  @include max-media(800px) {
    padding: 40px 20px;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
  }
  
  &:first-child {
    border-top: none;
  }

  .details-close {
    position: absolute;
    top: 0;
    right: 0;
    svg {
      fill: $color-bright-blue;
    }
  }

  &__details-name {
    font-size: 1.25rem;
    font-weight: 700;
    color: $color-brand-primary-blue;
  }
  
  &__details-photo {
    width: 150px;
    height: 150px;
    overflow: hidden;
    border-radius: 50%;
    margin: 0 auto;
  }

  &__details-number {
    padding: 10px;
    background: $color-cool-gray;
    border-radius: 2px;
    text-align: left;
    margin: 0.5rem 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    &-phone {
      font-weight: 700;
    }
  }

  .primary-item {
    font-size: 1.25rem;

    &--work {
      color: $color-bright-blue;
    }
    &--cell {
      color: $color-bright-green;
    }
    &--home {
      color: $color-brand-secondary-blue;
    }
  }

  .item-chip {
    display: inline-flex;
    font-size: 0.75rem;
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
