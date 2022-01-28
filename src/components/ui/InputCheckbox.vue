<template>
  <div class="input-checkbox-field">
    <input
      class="input-checkbox-field__input"
      :id="id"
      :name="name"
      type="checkbox" 
      :value="inputValue"
      @input="$emit('update', $event.target.value)"
      />
    <label 
      class="input-checkbox-field__label"
      :for="id"
    >
      {{ label }}
    </label>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    inputValue: {
      type: String,
      required: false,
    },
  },
  model: {
    prop: "value",
    event: "update"
  }
};
</script>

<style scoped lang="scss">
.input-checkbox-field {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding-bottom: 0.5rem;
  position: relative;
  font-size: 0.75rem;

  &__label {
    text-align: left;
    font-size: 0.675rem;
    color: $color-black;
    padding-bottom: 0.125rem;
    display: flex;
    align-items: center;
    position: relative;

    &:after {
      content: '';
      position: absolute;
      left: -17px;
      top: 9px;
      background: white;
      width: 2px;
      height: 2px;
      box-shadow: 
        2px 0 0 white,
        4px 0 0 white,
        4px -2px 0 white,
        4px -4px 0 white,
        4px -6px 0 white,
        4px -8px 0 white;
      transform: rotate(45deg);
      opacity: 0;
      transition: all 0.25s ease-in-out;
    }
  }

  &__input {
    border: 1px solid $color-cool-gray;
    border-radius: 2px;
    background: $color-cool-gray;
    font-weight: 700;
    padding: 0.5rem;
    margin-right: 0.125rem;
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

    &:checked {
      background: $color-bright-blue;
      border-color: $color-bright-blue;

      + label:after {
        opacity: 1;
      }
    }
  }
}
</style>