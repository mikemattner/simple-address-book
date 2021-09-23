<template>
  <button 
    :class="[
      'button',
      secondary == true ? 'button--secondary' : '',
      error == true ? 'button--error' : '',
      success == true ? 'button--success' : '',
      block == true ? 'button--block' : '',
      loading == true ? 'button--loading' : '',
    ]" 
    @click="$emit('clicked')"
    :type="type"
  >
    <span class="button--content" v-if="!loading">
      <slot />
    </span>
    <span class="button--loader load-animate" v-if="loading"></span>
  </button>
</template>

<script>
export default {
  props: {
    secondary: Boolean,
    success: Boolean,
    error: Boolean,
    loading: Boolean,
    block: Boolean,
    type: {
      type: String,
      default: "button",
    }
  },
};
</script>

<style scoped lang="scss">
.button {
  background-color: $color-bright-blue;
  border-radius: 2px;
  color: $color-white;
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  transition: all 0.25s ease-in-out;
  overflow: hidden;
  font-size: 0.75rem;
  font-weight: 700;

  border: none;
  outline: 0;

  &:focus {
    background-color: shade($color-bright-blue, 10%);
    outline: 0;
    box-shadow: 0 0 4px $color-bright-blue,
        1px 0.7px 2.2px rgba(0, 0, 0, 0.02),
        2.4px 1.8px 5.3px rgba(0, 0, 0, 0.028),
        4.5px 3.4px 10px rgba(0, 0, 0, 0.035), 8px 6px 17.9px rgba(0, 0, 0, 0.042),
        15px 11.3px 33.4px rgba(0, 0, 0, 0.05), 36px 27px 80px rgba(0, 0, 0, 0.07);
  }

  &:hover {
    background-color: shade($color-bright-blue, 20%);
    outline: 0;
    box-shadow: 1px 0.7px 2.2px rgba(0, 0, 0, 0.02),
        2.4px 1.8px 5.3px rgba(0, 0, 0, 0.028),
        4.5px 3.4px 10px rgba(0, 0, 0, 0.035), 8px 6px 17.9px rgba(0, 0, 0, 0.042),
        15px 11.3px 33.4px rgba(0, 0, 0, 0.05), 36px 27px 80px rgba(0, 0, 0, 0.07);
  }

  &--block {
    width: 100%;
  }

  &--secondary {
    background-color: $color-brand-secondary-blue;

    &:hover {
      background-color: shade($color-brand-secondary-blue, 10%);
    }
    &:focus {
      background-color: shade($color-brand-secondary-blue, 10%);
      box-shadow: 0 0 4px $color-brand-secondary-blue,
        1px 0.7px 2.2px rgba(0, 0, 0, 0.02),
        2.4px 1.8px 5.3px rgba(0, 0, 0, 0.028),
        4.5px 3.4px 10px rgba(0, 0, 0, 0.035), 8px 6px 17.9px rgba(0, 0, 0, 0.042),
        15px 11.3px 33.4px rgba(0, 0, 0, 0.05), 36px 27px 80px rgba(0, 0, 0, 0.07);
    }
  }

  &--error {
    background-color: $color-brand-primary-red;

    &:hover {
      background-color: shade($color-brand-primary-red, 10%);
    }
    &:focus {
      background-color: shade($color-brand-primary-red, 10%);
      box-shadow: 0 0 4px $color-brand-primary-red,
        1px 0.7px 2.2px rgba(0, 0, 0, 0.02),
        2.4px 1.8px 5.3px rgba(0, 0, 0, 0.028),
        4.5px 3.4px 10px rgba(0, 0, 0, 0.035), 8px 6px 17.9px rgba(0, 0, 0, 0.042),
        15px 11.3px 33.4px rgba(0, 0, 0, 0.05), 36px 27px 80px rgba(0, 0, 0, 0.07);
    }
  }

  &--success {
    background-color: $color-bright-green;

    &:hover {
      background-color: shade($color-bright-green, 10%);
    }
    &:focus {
      background-color: shade($color-bright-green, 10%);
      box-shadow: 0 0 4px $color-bright-green,
        1px 0.7px 2.2px rgba(0, 0, 0, 0.02),
        2.4px 1.8px 5.3px rgba(0, 0, 0, 0.028),
        4.5px 3.4px 10px rgba(0, 0, 0, 0.035), 8px 6px 17.9px rgba(0, 0, 0, 0.042),
        15px 11.3px 33.4px rgba(0, 0, 0, 0.05), 36px 27px 80px rgba(0, 0, 0, 0.07);
    }
  }

  &--loader {
    width: 20px;
    height: 20px;
    border: 3px solid $color-white;
    border-top: 3px solid transparent;
    border-radius: 100%;
  }
}

</style>