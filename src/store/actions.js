import {ADD_COUNTER, ADD_TO_CART} from './mutation-types'


export default {
  addCart(context,payload) {
    return new Promise((resolve, reject) => {
      //payload为新添加的商品
      let oldProduct = null;
      for(let item of context.state.cartList){
        if(item.iid === payload.iid){
          oldProduct = item;
        }
      }
      //判断商品在购物车里是否纯在
      if(oldProduct) {//数量加一
        //oldProduct.count +=1;
        context.commit(ADD_COUNTER, oldProduct);
        resolve("当前商品数量加一")
      }else{//添加新商品
        payload.count = 1;
        //state.cartList.push(payload);
        context.commit(ADD_TO_CART,payload);
        resolve("添加了新商品")
      }
    })
  }
}