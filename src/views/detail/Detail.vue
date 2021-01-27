<template>
  <div id="detail">
    <DetailNavBar class="detail-nav" @titleClick='titleClick' ref="nav"/>
    <scroll class="content" ref="scroll" @scroll='contentScroll' :probe-type='3'>
        <!-- <ul>
          <li v-for="item in $store.state.cartList" :key="item.index">{{item}}</li>
        </ul> -->
      <DetailSwiper :top-images='topImages'/>
      <detail-base-info :goods='goods'/>
      <detail-shop-info :shop='Shop'/>
      <detail-goods-info :detail-info='detailInfo' @imageLoad='imgLoad'></detail-goods-info>
      <detail-param-info :param-info='paramInfo' ref="params"></detail-param-info>
      <detail-comment-info :comment='commentInfo' ref="comment"></detail-comment-info>
      <goods-list :goods='recommends' ref='recommend'></goods-list>
      
    </scroll>
    <detail-bottom-bar @addCart='addCart'></detail-bottom-bar>
    <back-top @click.native="backTop" v-show="isShowBackTop"></back-top>
  </div>
</template>
<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'

import Scroll from 'components/common/scroll/scroll'
import GoodsList from 'components/content/goods/GoodsList'



import {getDetail, Goods, Shop, GoodsParam, getRecommend} from 'network/detail'
import {debounce} from 'common/utils'
import {itemListenerMixin, backTopMixin} from 'common/mixin'

import { mapActions } from 'vuex'
export default {
  name:'Detail',
  components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    
  },
  mixins: [itemListenerMixin,backTopMixin],
  data(){
    return {
      iid:null,
      topImages:[],
      goods:{},
      Shop:{},
      detailInfo:{},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      currentIndex: 0,
      
    }
  },
  created(){
    //1.保存传入的iid
    this.iid=this.$route.params.iid
    //2.根据iid请求详细数据
    getDetail(this.iid).then(res=>{
      //console.log(res);
      const data=res.result;
      //1.获取顶部的轮播数据
      this.topImages = res.result.itemInfo.topImages;

      //2.获取商品信息
      this.goods=new Goods(data.itemInfo,data.columns,data.shopInfo.services);
      
      //3.创建店铺信息的对象
      this.Shop=new Shop(data.shopInfo);

      //4.保存商品的详情数据
      this.detailInfo = data.detailInfo;

      //5.获取参数的信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);

      //7.取出评论信息
      if(data.rate.cRate !== 0){
        this.commentInfo = data.rate.list[0]
      }
    })
    //3.请求推荐数据
    getRecommend().then(res=>{
      this.recommends = res.data.list;
    })
  },
  mounted(){
     
  },
  destroyed(){
    this.$bus.$off('itemImgLoad', this.itemImgListener)
  },
  methods:{
    ...mapActions({
      add:'addCart'
    }),
    imgLoad(){
      
      this.refresh();

      this.themeTopYs=[];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop-44);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop-44);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop-44);
      this.themeTopYs.push(Number.MAX_VALUE);
      //console.log(this.themeTopYs);
      
    },
    titleClick(index) {
      console.log(index);
      this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],200);
    },
    contentScroll(position){
      //console.log(position.y);
      //1.获取y值
      const positionY = -position.y;
      //2.positionY和主题中值进行对比
      let length = this.themeTopYs.length;
      // for (let i = 0; i < length; i++){
      //   if(this.currentIndex !== i && ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) ||
      //    (i === length - 1 && positionY >= this.themeTopYs[i]))){
      //      this.currentIndex = i;
      //      console.log(i);
      //      this.$refs.nav.currentIndex = this.currentIndex;
      //    }
      // }
      for(let i = 0;i < length-1; i++){
        if(this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])){
           this.currentIndex = i;
           console.log(i);
           this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
      //3.是否显示回到顶部
      //console.log(isShowBackTop);
      this.isShowBackTop = -position.y > 1000;
    },
    addCart(){
      //1.获取购物车需要展示的信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;
      

      //2.将商品添加到购物车
      //this.$store.cartList.push(product)
      //store里面mutations里方法的用法
      //this.$store.commit('addCart', product)
      //store里面actions里方法的用法
      //dispatch返回了一个promise对象
      //（1）常规写法
      // this.$store.dispatch('addCart', product).then(res => {
      //   console.log(res);
      // })
      //（2）mapActions的映射关系
      this.add(product).then(res => {
        //console.log(res);
        this.$toast.show(res);
      })

    }
  }
}
</script>
<style scoped>
#detail{
  position: relative;
  z-index: 9;
  background-color:white ;
  height: 100vh;
}
.detail-nav{
  position: relative;
  z-index: 9;
  background-color: white;
}
.content{
  height: calc(100% - 44px - 49px);
}
</style>