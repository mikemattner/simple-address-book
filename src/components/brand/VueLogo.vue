<template>
    <img 
        alt="Vue Address Book" 
        src="../../assets/media/logo.png"
        :class="[
            'brand__logo',
            large == true ? 'brand__logo-large' : '',
            medium == true ? 'brand__logo-medium' : '',
            small == true ? 'brand__logo-small' : '',
            xsmall == true ? 'brand__logo-xs-small' : '',
        ]"
    >
</template>

<script>
export default {
  name: 'VueLogo',
  props: {
    large: Boolean,
    medium: Boolean,
    small: Boolean,
    xsmall: Boolean,
  },
}
</script>

<style scoped lang="scss">
.brand__logo {
    margin: 0 auto;

    &-large {
        width: 200px;
        height: 200px;
    }
    &-medium {
       width: 100px; 
       height: 100px; 
    }
    &-small {
        width: 40px;
        height: 40px;
    }

    &-xs-small {
        width: 25px;
        height: 25px;
    }
}
</style>
