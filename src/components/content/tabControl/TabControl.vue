<template>
  <div class="tab-control">
    <div v-for="(item,index) in titles" :key="item.acm"
     class="tab-control-item" :class="{active:index===currentIndex}"
     @click="itemclick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>
<script>
export default {
  name:'TabControl',
  props:{
    titles:{
      type:Array,
      default(){
        return [];
      }
    }
  },
  data(){
    return{
      currentIndex:0
    }
  },
  methods:{
    itemclick(index){
      this.currentIndex=index;
      this.$emit('tabClick',index);
    },
  }
}
</script>
<style scoped>
.tab-control{
  display: flex;
  width: 100%;
  text-align: center;
}
.tab-control-item{
  flex: 1;
  
}
.tab-control-item span{
  padding: 3px;
}
.active{
  color: var(--color-high-text);
  
}
.active span{
  border-bottom: 3px solid var(--color-tint);
}
</style>