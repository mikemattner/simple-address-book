<template>
  <div class="input-text-field">
    <label 
      class="input-text-field__label"
      :for="id"
    >
      {{ label }} <sup v-if="required">*</sup>
    </label>
    <input
      :class="[
      'input-text-field__input',
        error == true ? 'error' : '',
      ]"
      :id="id"
      :name="name"
      :type="type" 
      :value="value" 
      @input="$emit('update', $event.target.value)"
    />
    <div class="input-text-field__input-error slide-down-small" v-if="error">
      {{ message }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Boolean,
      default: false,
    },
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    required: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
  },
  model: {
    prop: "value",
    event: "update"
  }
};
</script>

<style scoped lang="scss">
.input-text-field {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  padding-bottom: 0.5rem;
  position: relative;

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
    background: $color-cool-gray;
    font-weight: 700;
    padding: 0.25rem;
    -webkit-appearance: none;
    outline: none;
    transition: all 0.25s ease-in-out;

    &:hover {
      border-color: $color-bright-blue;
      box-shadow: 1px 0.7px 2.2px rgba(0, 0, 0, 0.02),
        2.4px 1.8px 5.3px rgba(0, 0, 0, 0.028),
        4.5px 3.4px 10px rgba(0, 0, 0, 0.035), 8px 6px 17.9px rgba(0, 0, 0, 0.042),
        15px 11.3px 33.4px rgba(0, 0, 0, 0.05), 36px 27px 80px rgba(0, 0, 0, 0.07);
    }
    &:focus {
      background: $color-white;
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