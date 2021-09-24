<template>
  <transition name="modal">
    <div class="modal-mask">
        <div class="modal-container slide-up long-shadow">
          <div class="modal-container__header">
            <div class="modal-container__title">{{ title }}</div>
            <elm-button 
              v-if="closeButton"
              @clicked="$emit('close')"
              class="modal-close"
              tertiary
              light
              >
              <span class="visually-hidden">Close</span> <close-icon />
            </elm-button>
          </div>
          <div class="modal-body">
            <slot />
          </div>
        </div>
    </div>
  </transition>
</template>

<script>
import ElmButton from '@/components/ui/ElmButton.vue'
import CloseIcon from '@/assets/media/CloseIcon.svg'

export default {
  name: 'modal',
  components: {
    ElmButton,
    CloseIcon,
  },
  props: {
    title: String,
    closeButton: Boolean,
  }
};
</script>

<style lang="scss">
.modal {
  &-mask {
    position: fixed;
    z-index: 100011;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.75);
    transition: opacity .3s ease;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  &-body {
    padding: 20px;
  }

  &-container {
    background-color: $color-white;
    margin: 0px auto;
    max-width: 500px;
    width: 100%;
    transition: all .0.25s ease-in-out;
    position: relative;
    border-radius: 10px;

    @include max-media(500px) {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding-bottom: 2rem;
      border-radius: 10px 10px 0 0;
    }

    &__header {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      padding: 20px;
      background: $color-brand-secondary-blue;
      text-align: center;
      position: relative;
      border-radius: 10px 10px 0 0;
    }

    &__title {
      margin: 0;
      color: $color-cool-gray;
      font-size: 1rem;
      font-weight: 700;
    }
  }
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity .25s ease;
}

.modal-enter,
.modal-leave-active {
  opacity: 0;
}
</style>
