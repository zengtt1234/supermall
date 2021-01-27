<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="cart-nav">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>
    <!-- 商品列表 -->
    <cart-list class="cart-list"></cart-list>
    <!-- 底部汇总 -->
    <cart-bottom-bar class="cart-bottom-bar"></cart-bottom-bar>
  </div>
</template>
<script>
import NavBar from 'components/common/navbar/NavBar'
import CartList from 'views/cart/childComps/CartList'
import CartBottomBar from 'views/cart/childComps/CartBottomBar'

import { mapGetters } from 'vuex'

export default {
  name:"Cart",
  components:{
    NavBar,
    CartList,
    CartBottomBar
  },
  computed: {
    //将vuex里面的getters里面的方法拿过来使用
    //写法一
    // ...mapGetters([
    //   'cartLength',
    //   ]),
    //写法二(为getters里面的方法重映射一个名字)
    ...mapGetters({
      length: 'cartLength'
    })
    
  }
}
</script>
<style scoped>
.cart{
  height: 100vh;
}
.cart-nav{
  background-color: var(--color-tint);
  color: white;
}
</style>