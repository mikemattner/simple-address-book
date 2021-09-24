<template>
  <div class="input-select-field">
    <label 
      class="input-select-field__label"
      :for="id"
    >
      {{ label }} <sup v-if="required">*</sup>
    </label>
    <select
      :class="[
      'input-select-field__input',
        error == true ? 'error' : '',
      ]"
      :id="id"
      :name="name"
      :type="type" 
      :value="value" 
      @input="$emit('update', $event.target.value)"
    >   
      <option disabled value="">Select one...</option>
      <option v-for="option in options" :value="option">{{ option }}</option>
    </select>
    <div class="input-select-field__input-error slide-down-small" v-if="error">
      {{ message }}
    </div>
  </div>
</template>

<script>
import DropDownArrow from '@/components/svg/DropDownArrow.svg'

export default {
  components: {
    DropDownArrow,
  },
  props: {
    error: {
      type: Boolean,
      default: false,
    },
    id: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      required: true,
    },
    required: {
      type: Boolean,
      default: false,
    },
    value: {
      type: String,
    },
  },
  model: {
    prop: "value",
    event: "update"
  }
};
</script>

<style scoped lang="scss">
.input-select-field {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  padding-bottom: 0.5rem;
  position: relative;
  font-size: 0.75rem;

  &__label {
    text-align: left;
    font-size: 0.675rem;
    color: $color-black;
    padding-bottom: 0.125rem;

    sup {
      color: $color-brand-primary-red;
      font-size: 100%;
      top: -0.125em;
    }
  }

  &__input {
    border: 1px solid $color-cool-gray;
    border-radius: 2px;
    background-color: $color-cool-gray;
    background-image:
      linear-gradient(45deg, transparent 50%, $color-body-copy 50%),
      linear-gradient(135deg, $color-body-copy 50%, transparent 50%);
    background-position:
      calc(100% - 20px) 0.75em,
      calc(100% - 15px) 0.75em;
    background-size:
      5px 5px,
      5px 5px,
      1px 1.5em;
    background-repeat: no-repeat;
    font-weight: 700;
    padding: 0.25rem;
    -webkit-appearance: none;
    outline: none;
    transition: all 0.25s ease-in-out;
    position: relative;

    &:hover {
      border-color: $color-bright-blue;
      box-shadow: 1px 0.7px 2.2px rgba(0, 0, 0, 0.02),
        2.4px 1.8px 5.3px rgba(0, 0, 0, 0.028),
        4.5px 3.4px 10px rgba(0, 0, 0, 0.035), 8px 6px 17.9px rgba(0, 0, 0, 0.042),
        15px 11.3px 33.4px rgba(0, 0, 0, 0.05), 36px 27px 80px rgba(0, 0, 0, 0.07);
    }
    &:focus {
      background-color: $color-white;
      border-color: $color-bright-blue;
      box-shadow: 0 0 4px $color-bright-blue,
        1px 0.7px 2.2px rgba(0, 0, 0, 0.02),
        2.4px 1.8px 5.3px rgba(0, 0, 0, 0.028),
        4.5px 3.4px 10px rgba(0, 0, 0, 0.035), 8px 6px 17.9px rgba(0, 0, 0, 0.042),
        15px 11.3px 33.4px rgba(0, 0, 0, 0.05), 36px 27px 80px rgba(0, 0, 0, 0.07);
    }
    &.error {
      border-color: $color-brand-primary-red;
    }
    &-error {
      opacity: 0;
      color: $color-brand-primary-red;
      font-size: 0.675rem;
      font-weight: 700;
    }
  }
}
</style>