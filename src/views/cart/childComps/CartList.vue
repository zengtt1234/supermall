<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <!-- <li v-for="item in cartList" :key="item.index">{{item}}</li>   -->
      <cart-list-item v-for="(item,index) in cartList" :key="index" :itemInfo="item"></cart-list-item>
    </scroll>
    
  </div>
</template>
<script>
import Scroll from 'components/common/scroll/scroll'
import CartListItem from 'views/cart/childComps/CartListItem'

import { mapGetters } from 'vuex'
export default {
  name: 'CartList',
  components:{
    Scroll,
    CartListItem
  },
  computed: {
    ...mapGetters(['cartList'])
  },
  activated() {
    //console.log("----");
    this.$refs.scroll.refresh();
  }
}
</script>
<style scoped>
.cart-list{
  height: calc(100vh - 44px - 49px - 40px);
}
.content{
  height: 100%;
  overflow: hidden;
}
</style>