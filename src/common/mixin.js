import {debounce} from 'common/utils';
import BackTop from 'components/content/backTop/BackTop'

export const itemListenerMixin = {
  data(){
    return {
      itemImgListener: null,
      refresh:null
    }
  },
  mounted() {
    this.refresh=debounce(this.$refs.scroll.refresh,100);
     this.itemImgListener = ()=>{this.refresh();}
     this.$bus.$on('itemImgLoad', this.itemImgListener)
     //console.log("混入的内容")
  }
}
export const backTopMixin = {
  components: {
    BackTop
  },
  data(){
    return {
      isShowBackTop: false,
    }
  },
  methods: {
    backTop() {
      this.$refs.scroll.scrollTo(0,0,300);
    }
  }
}

