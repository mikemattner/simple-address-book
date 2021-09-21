<template>
    <img 
        alt="Vue Address Book" 
        src="../../assets/logo.png"
        :class="[
            'brand__logo',
            large == true ? 'brand__logo-large' : '',
            medium == true ? 'brand__logo-medium' : '',
            small == true ? 'brand__logo-small' : '',
        ]"
    >
</template>

<script>
export default {
  name: 'Logo',
  props: {
    large: Boolean,
    medium: Boolean,
    small: Boolean,
  },
}
</script>

<style scoped lang="scss">
.brand__logo {
    margin: 0 auto;

    &-large {
        width: 200px;
    }
    &-medium {
       width: 100px; 
    }
    &-small {
        width: 45px;
    }
}
</style>
