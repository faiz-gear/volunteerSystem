<template>
  <div id="aside-manage-list-item">
    <div class="active-manage-list">
       <a @click=listTitleClick><i class="iconfont" :class="listIcon"></i>{{listTitle[0]}}<i class="iconfont iconxia" :class="{active:isActive}"></i></a>
    </div>
    <div class="wrapper" ref="wrapper">
      <a v-for="(title, index) in listItemTitle" @click="itemClick(index)" :class="{ activeA: currentIndex == index }">
        <i :class="listItemIcon[index]" class="iconfont"></i>{{title}}<i class="iconfont iconxiangyou":class="{ activeI: currentIndex == index }"></i></a>
    </div>
  </div>
</template>

<script>
export default {
  name: "AsideManageListItem",
  props: {
    listTitle: {
      type: Array,
      default() {
        return [];
      }
    },
    listIcon:{
      type: Array,
      default() {
        return [];
      }
    },
    listItemTitle:{
      type: Array,
      default() {
        return [];
      }
    },
    listItemIcon:{
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      currentIndex: null,
      isActive: false,
    };
  },
  methods: {
    listTitleClick(){
      this.isActive = !this.isActive;
      // console.log(this.listItemTitle.length);
      // 下拉效果
      if(this.isActive){
        this.$refs.wrapper.style.height = 56 * this.listItemTitle.length + 'px'
      }
      else{
        this.$refs.wrapper.style.height = 0
      }
    },
    itemClick(index) {
      this.currentIndex = index;
      // console.log(this.currentIndex);
      this.$router.replace(this.listItemTitle[index]);
    },
   
  },
};
</script>

<style scoped>
.active-manage-list {
  width: 100%;
  position: relative;
  overflow: hidden;
}
.active-manage-list a {
  display: inline-block;
  width: inherit;
  height: 56px;
  line-height: 56px;
  font-size: 14px;
  transition: 0.7s;
}
.active-manage-list>a i:first-child{
  margin: 0 10px 0 15px;
}
.active-manage-list>a i:nth-child(2){
  position: absolute;
  right: 20px;
}
/* 向下箭头 */
.active{
  transform: rotate(180deg);
}
.wrapper {
  width: 100%;
  position: relative;
  overflow: hidden;
  height: 0;
  transition: .5s;
}
.wrapper a {
  display: inline-block;
  width: inherit;
  height: 56px;
  line-height: 56px;
  font-size: 14px;
  transition: 0.7s;
}
.wrapper a i:first-child {
  margin: 0 10px 0 15px;
}
.wrapper a i:nth-of-type(2) {
  position: absolute;
  right: -20px;
  transition: right 0.5s;
  opacity: 0;
}
.wrapper a:hover {
  background-color: #e2fafa;
}
.wrapper a:hover i:nth-of-type(2) {
  right: 20px;
  opacity: 1;
}
.activeA {
  background-color: #48dbfb !important;
}
.activeI {
  right: 20px !important;
  opacity: 1 !important;
}
</style>