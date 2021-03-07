<template>
  <div id="app" class="layout">
    <router-view></router-view>
  </div>
</template>

<script>
import Index from './views/index'

export default {
  name: "App",
  components: {
    Index

  }
};
</script>

<style>
@import url("./assets/css/reset.css");
@import url("./assets/css/iconfont/iconfont.css");
#app {
  height: 100%;
}
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.layout-logo {
  width: 100px;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  float: left;
  position: relative;
  top: 15px;
  left: 20px;
}
.layout-nav {
  width: 420px;
  margin: 0 auto;
  margin-right: 20px;
}
/* 去除内容区内边距 */
.ivu-layout-content {
  padding: 10px 0 0 !important;
  background-color: #f5f7f9 !important;
}
/*  */
.ivu-layout {
  height: 100%;
}
/* 解决部分分辨率下出现滚动体的bug */
.ivu-table-overflowX {
  overflow-x: hidden;
}
</style>
