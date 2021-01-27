<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-button"
                   :is-checked = 'isSelectAll'
                   @click.native = 'checkClick'></check-button>
      <span>全选</span>
    </div>
    <div class="total-price">
      合计：{{totalPrice}}
    </div>
    <div class="calculate">
      去结算({{checkLength}})
    </div>
  </div>
</template>
<script>
import CheckButton from 'components/content/checkButton/CheckButton'
export default {
  name: 'CartBottomBar',
  components: {
    CheckButton,
  },
  computed: {
    totalPrice() {
      return "￥" + this.$store.state.cartList.filter(item => {
        return item.checked
      }).reduce((preValue, item) => {
        return preValue + item.price * item.count;
      },0).toFixed(2);
    },
    checkLength() {
      return this.$store.state.cartList.filter(item => {
        return item.checked
      }).reduce((preValue, item) => {
        return preValue + item.count;
      },0);
    },
    isSelectAll() {
      const length=this.$store.state.cartList.length;
      if (length ===0) return false;
      return this.$store.state.cartList.filter(item => item.checked).length === length;
    },
    
  },
  methods: {
    checkClick() {
      //console.log("点击全选按钮")
      if(this.isSelectAll){
        //全部切换为未选中
        for(let item of this.$store.state.cartList){
          item.checked = false;
        }
      }else{
        //全部切换为选中
        for(let item of this.$store.state.cartList){
            item.checked = true;
        }
      }
    }
  }
}
</script>
<style scoped>
.bottom-bar {
  font-size: 14px;
  height: 40px;
  line-height: 40px;
  width: 100%;
  position: relative;
  display: flex;
  background-color: #eee;
}
.check-content {
  display: flex;
  align-items: center;
  margin-left: 10px;
  width: 60px;
}
.check-button {
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 5px;
}

.total-price{
  display: flex;
  align-items: center;
  margin-left: 20px;
  flex: 1;
}
.calculate{
  width: 90px;
  color: white;
  background-color: var(--color-tint);
  text-align: center;
}
</style>