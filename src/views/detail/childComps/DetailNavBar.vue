<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg">
      </div>
      <div slot="center" class="title">
        <div v-for="(item, index) in titles" :key="item.index"
             class="title-item" :class="{active:index===currentIndex}"
             @click="titleItemClick(index)">{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>
<script>
import NavBar from 'components/common/navbar/NavBar'
export default {
  name:'DetailNavBar',
  components:{
    NavBar
  },
  data(){
    return {
      titles:['商品','参数','评论','推荐'],
      currentIndex:0
    }
  },
  methods:{
    titleItemClick(index){
      this.currentIndex=index;
      //详情页导航栏跳转后，发送事件
      this.$emit('titleClick',index);
      
    },
    backClick(){
      //this.$router.go(-1);
      this.$router.back();
    }
  }
}
</script>
<style scoped>
.title{
  display: flex;
  font-size: 13px;
}
.title-item{
  flex: 1;
}
.active{
  color: var(--color-high-text);
}
.back img{
  margin-top:11px;
}
</style>