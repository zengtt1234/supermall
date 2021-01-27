<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control :titles="['流行','新款','精品']" @tabClick="tabClick" 
                  ref="tabControl1" class="tab-control" v-show="isTabFixed"></tab-control>
    <scroll class="content" ref="scroll" :probe-type='3' 
      @scroll="contentScroll" :pullUpLoad='true'
      @pullingUp='loadMore'>
      <home-swiper :banners='banners' @swiperImageLoad='swiperImageLoad'></home-swiper>
      <recommend-view :recommends='recommends'></recommend-view>
      <ferture-view></ferture-view>
      <tab-control :titles="['流行','新款','精品']" @tabClick="tabClick" ref="tabControl2"></tab-control>

      <goods-list :goods='showGoods'></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <!-- <ul>
      <li>列表内容1</li>
      <li>列表内容2</li>
      <li>列表内容3</li>
      <li>列表内容4</li>
      <li>列表内容5</li>
      <li>列表内容6</li>
      <li>列表内容7</li>
      <li>列表内容8</li>
      <li>列表内容9</li>
      <li>列表内容10</li>
      <li>列表内容11</li>
      <li>列表内容12</li>
      <li>列表内容13</li>
      <li>列表内容14</li>
      <li>列表内容15</li>
      <li>列表内容16</li>
      <li>列表内容17</li>
      <li>列表内容18</li>
      <li>列表内容19</li>
      <li>列表内容20</li>
      <li>列表内容21</li>
      <li>列表内容22</li>
      <li>列表内容23</li>
      <li>列表内容24</li>
      <li>列表内容25</li>
      <li>列表内容26</li>
      <li>列表内容27</li>
      <li>列表内容28</li>
      <li>列表内容29</li>
      <li>列表内容30</li>
      <li>列表内容31</li>
      <li>列表内容32</li>
      <li>列表内容33</li>
      <li>列表内容34</li>
      <li>列表内容35</li>
      <li>列表内容36</li>
      <li>列表内容37</li>
      <li>列表内容38</li>
      <li>列表内容39</li>
      <li>列表内容40</li>
      <li>列表内容41</li>
      <li>列表内容42</li>
      <li>列表内容43</li>
      <li>列表内容44</li>
      <li>列表内容45</li>
      <li>列表内容46</li>
      <li>列表内容47</li>
      <li>列表内容48</li>
      <li>列表内容49</li>
      <li>列表内容50</li>
      <li>列表内容51</li>
      <li>列表内容52</li>
      <li>列表内容53</li>
      <li>列表内容54</li>
      <li>列表内容55</li>
      <li>列表内容56</li>
      <li>列表内容57</li>
      <li>列表内容58</li>
      <li>列表内容59</li>
      <li>列表内容60</li>
      <li>列表内容61</li>
      <li>列表内容62</li>
      <li>列表内容63</li>
      <li>列表内容64</li>
      <li>列表内容65</li>
      <li>列表内容66</li>
      <li>列表内容67</li>
      <li>列表内容68</li>
      <li>列表内容69</li>
      <li>列表内容70</li>
      <li>列表内容71</li>
      <li>列表内容72</li>
      <li>列表内容73</li>
      <li>列表内容74</li>
      <li>列表内容75</li>
      <li>列表内容76</li>
      <li>列表内容77</li>
      <li>列表内容78</li>
      <li>列表内容79</li>
      <li>列表内容80</li>
      <li>列表内容81</li>
      <li>列表内容82</li>
      <li>列表内容83</li>
      <li>列表内容84</li>
      <li>列表内容85</li>
      <li>列表内容86</li>
      <li>列表内容87</li>
      <li>列表内容88</li>
      <li>列表内容89</li>
      <li>列表内容90</li>
      <li>列表内容91</li>
      <li>列表内容92</li>
      <li>列表内容93</li>
      <li>列表内容94</li>
      <li>列表内容95</li>
      <li>列表内容96</li>
      <li>列表内容97</li>
      <li>列表内容98</li>
      <li>列表内容99</li>
      <li>列表内容100</li>
    </ul> -->
  </div>
   
</template>
<script>
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FertureView from './childComps/FeatureView'

import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/scroll'
import BackTop from 'components/content/backTop/BackTop'

import { getHomeMultidata, getHomeGoods } from 'network/home'
import {debounce} from 'common/utils'
import {itemListenerMixin} from 'common/mixin'



export default {
  name:"Home",
  components:{
    HomeSwiper,
    RecommendView,
    FertureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  mixins: [itemListenerMixin],
  data(){
    return{
      banners:[],
      recommends:[],
      goods:{
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []}
      },
      currentType:'pop',
      isShowBackTop:false,
      tabOffsetTop:0,
      isTabFixed:false,
      saveY:0
    }
  },
  computed:{
    showGoods(){
      return this.goods[this.currentType].list
    }
  },
  created(){
    //1.请求多个数据
    this.getHomeMultidata();
    //2.请求商品数据
    this.getHomeGoods('pop');
    this.getHomeGoods('new');
    this.getHomeGoods('sell');
  },
  mounted(){
    // //1.图片加载完成的事件监听
    // let refresh=debounce(this.$refs.scroll.refresh,50);
    // //对监听事件进行保存
    // this.itemImgListener = () => { refresh() }
    // this.$bus.$on('itemImgLoad',this.itemImgListener);
  },
  activated(){
    this.$refs.scroll.refresh();
    this.$refs.scroll.scrollTo(0,this.saveY,0);
  },
  deactivated(){
    //保存Y值
    this.saveY=this.$refs.scroll.getScrollY();
    //取消全局事件的监听
    this.$bus.$off('itemImgLoad', this.itemImgListener);
  },
  methods:{
    /*
    网络请求相关的方法
    */
    getHomeMultidata(){
      getHomeMultidata().then(res => {
        //console.log(res.data);
        //this.result=res;
        this.banners=res.data.banner.list;
        this.recommends=res.data.recommend.list;
      })
    },
    getHomeGoods(type){
      const page=this.goods[type].page + 1;
      getHomeGoods(type,page).then( res=> {
        //console.log(res);
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        //完成上拉加载更多
        this.$refs.scroll.finishPullUp();
      })
    },
    /*事件监听的相关方法 */
    tabClick(index){
      // switch(index){
      //   case 0:
      //     this.currentType='pop';
      //     break;
      //   case 1:
      //     this.currentType='';
      //     break;
      //   case 2:
      //     this.currentType='';
      //     break;
      // }
      //Object.keys() 方法会返回一个由一个给定对象的自身可枚举属性组成的数组
      this.currentType=Object.keys(this.goods)[index];
      this.$refs.tabControl1.currentIndex=index;
      this.$refs.tabControl2.currentIndex=index;
    },
    backClick(){
      //500ms时间内回到x=0,y=0的位置
      //this.$refs.scroll.scroll.scrollTo(0,0,500);
      this.$refs.scroll.scrollTo(0,0);
    },
    contentScroll(position){
      //1.判断backTop是否显示
      this.isShowBackTop=Math.abs(position.y)>1000;
      //2.决定tabControl是否吸顶(position:fixed)
      this.isTabFixed=Math.abs(position.y)>this.tabOffsetTop;
    },
    loadMore(){
      this.getHomeGoods(this.currentType)
    },
    swiperImageLoad(){
      //2.获取tabControl的offsetTop
      //所有的组件都有一个属性$el：用于获取组件中的元素
      //console.log(this.$refs.tabControl.$el.offsetTop);
      this.tabOffsetTop=this.$refs.tabControl2.$el.offsetTop;
     
    }
  }

}
</script>
<style scoped>
  #home{
    /* padding-top: 44px; */
    height: 100vh;
  }
  .home-nav{
    background-color: var(--color-tint);
    color: white;
    /* 原生滚动时的吸顶效果 */
    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 2; */
    /* position: sticky;
    top:0px; */
  }
  .content{
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  .tab-control{
    position: relative;
    z-index: 9;
  }
  /* .content{
    height: calc(100% - 93px);
    overflow: hidden;
    
  } */
</style>