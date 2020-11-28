<template>
  <div id="app">
    <header-manage></header-manage>
    <aside-manage></aside-manage>
    <router-view/>
    <footer-manage></footer-manage>
  </div>
</template>

<script>
import AsideManage from './components/common/asideManage/AsideManage'
import HeaderManage from './components/common/headerManage/HeaderManage'
import FooterManage from './components/common/footerManage/FooterManage'

export default {
  name: 'App',
  components:{
    AsideManage,
    HeaderManage,
    FooterManage,
  }
}
</script>

<style>
  @import url('./assets/css/reset.css');
  @import url('./assets/css/iconfont/iconfont.css');
  #app{
    height: 100%;
  }
</style>
