<template>
  <div class="check-button" :class="{check: isChecked}">
    <img src="~assets/img/cart/tick.svg">
  </div>
</template>
<script>
export default {
  name: 'CheckButton',
  props:{
    isChecked: {
      type: Boolean,
      default: false,
    }
  }
}
</script>
<style scoped>
.check-button {
  border-radius: 50%;
  border:1px solid rgb(224, 224, 224);
}
.check {
  border-color:  var( --color-tint);
  background: var( --color-tint);
}
</style>