<template>
  <button 
    :class="[
      'button',
      secondary == true ? 'button--secondary' : '',
      tertiary == true ? 'button--tertiary' : '',
      error == true ? 'button--error' : '',
      success == true ? 'button--success' : '',
      block == true ? 'button--block' : '',
      light == true ? 'button--light' : '',
      loading == true ? 'button--loading' : '',
    ]" 
    @click="$emit('clicked')"
    :type="type"
    :title="title"
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
    block: Boolean,
    error: Boolean,
    light: Boolean,
    loading: Boolean,
    secondary: Boolean,
    success: Boolean,
    tertiary: Boolean,
    title: String,
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
  margin: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  transition: all 0.25s ease-in-out;
  overflow: hidden;
  font-size: 0.75rem;
  font-weight: 700;
  border: none;

  svg {
    width: 15px;
    height: 15px;
    fill: $color-white;
    transition: all 0.25s ease-in-out;
  }

  &--content {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  &:first-child {
    margin-left: 0;
  }

  &:focus {
    background-color: shade($color-bright-blue, 10%);
    outline: 1px dotted $color-body-copy;
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
    margin: 0.5rem 0;
  }

  &--secondary {
    background-color: unset;
    color: $color-bright-blue;
    padding: 0.5rem;
    box-shadow: inset 0 0 0 2px $color-bright-blue;

    &:hover {
      background-color: rgba($color-bright-blue,0.1);
      box-shadow: inset 0 0 0 2px $color-bright-blue;
      color: shade($color-bright-blue, 30%);
    }
    &:focus {
      background-color: rgba($color-bright-blue,0.1);
      box-shadow: inset 0 0 0 2px $color-bright-blue;
      color: shade($color-bright-blue, 30%);
    }

    &.button--error {
      background-color: unset;
      color: $color-brand-primary-red;
      box-shadow: inset 0 0 0 2px $color-brand-primary-red;

      &:hover {
        background-color: rgba($color-brand-primary-red,0.1);
        color: shade($color-brand-primary-red, 20%);
        box-shadow: inset 0 0 0 2px $color-brand-primary-red;
      }
      &:focus {
        background-color: rgba($color-brand-primary-red,0.1);
        box-shadow: none;
        color: shade($color-brand-primary-red, 20%);
        box-shadow: inset 0 0 0 2px $color-brand-primary-red;
      }
    }
    &.button--success {
      background-color: unset;
      color: $color-bright-green;
      box-shadow: inset 0 0 0 2px $color-bright-green;

      &:hover {
        background-color: rgba($color-bright-green,0.1);
        color: shade($color-bright-green, 20%);
        box-shadow: inset 0 0 0 2px $color-bright-green;
      }
      &:focus {
        background-color: rgba($color-bright-green,0.1);
        box-shadow: none;
        color: shade($color-bright-green, 20%);
        box-shadow: inset 0 0 0 2px $color-bright-green;
      }
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

  &--tertiary {
    background-color: unset;
    color: $color-bright-blue;
    padding: 0.5rem;

    &:hover {
      background-color: rgba($color-bright-blue,0.1);
      box-shadow: unset;
      color: shade($color-bright-blue, 30%);
    }
    &:focus {
      background-color: rgba($color-bright-blue,0.1);
      box-shadow: unset;
      color: shade($color-bright-blue, 30%);
    }

    &.button--error {
      background-color: unset;
      color: $color-brand-primary-red;

      &:hover {
        background-color: rgba($color-brand-primary-red,0.1);
        color: shade($color-brand-primary-red, 20%);
      }
      &:focus {
        background-color: rgba($color-brand-primary-red,0.1);
        box-shadow: none;
        color: shade($color-brand-primary-red, 20%);
      }
    }
    &.button--success {
      background-color: unset;
      color: $color-bright-green;

      &:hover {
        background-color: rgba($color-bright-green,0.1);
        color: shade($color-bright-green, 20%);
      }
      &:focus {
        background-color: rgba($color-bright-green,0.1);
        box-shadow: none;
        color: shade($color-bright-green, 20%);
      }
    }
    &.button--light {
      background-color: unset;
      color: $color-white;

      &:hover {
        background-color: rgba($color-white,0.1);
        color: shade($color-white, 20%);
      }
      &:focus {
        background-color: rgba($color-white,0.1);
        box-shadow: none;
        color: shade($color-white, 20%);
      }
    }
  }

  &--loader {
    width: 15px;
    height: 15px;
    border: 3px solid $color-white;
    border-top: 3px solid transparent;
    border-radius: 100%;
  }
}

</style>