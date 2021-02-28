<template>
  <div id="app" class="layout">
    <Layout>
      <Header>
        <Menu mode="horizontal" theme="dark" active-name="1">
          <div class="layout-logo"></div>
          <div class="layout-nav">
            <MenuItem name="1">
              <Icon type="ios-navigate"></Icon>
              登录
            </MenuItem>
            <MenuItem name="2">
              <Icon type="ios-keypad"></Icon>
              退出登录
            </MenuItem>
          </div>
        </Menu>
      </Header>
      <Layout>
        <Sider hide-trigger :style="{ background: '#fff' }">
          <Menu
            active-name="1-1"
            theme="light"
            width="auto"
            :open-names="['1']"
            accordion
          >
            <Submenu name="1">
              <template slot="title">
                <Icon type="md-people"></Icon>
                志愿者管理
              </template>
              <MenuItem name="1-1" to="/volunteerMessage">志愿者信息</MenuItem>
            </Submenu>
            <Submenu name="2">
              <template slot="title">
                <Icon type="ios-home"></Icon>
                部门管理
              </template>
              <MenuItem name="2-1" to="/departmentClass">部门分类</MenuItem>
              <MenuItem name="2-2" to="/departmentMember">部门成员</MenuItem>
            </Submenu>
            <Submenu name="3">
              <template slot="title">
                <Icon type="md-folder-open"></Icon>
                文件管理
              </template>
              <MenuItem name="3-1" to="/filePlan">活动策划文件</MenuItem>
              <MenuItem name="3-2" to="/fileOther">其他文件</MenuItem>
            </Submenu>
            <Submenu name="4">
              <template slot="title">
                <Icon type="md-walk"></Icon>
                活动管理
              </template>
              <MenuItem name="4-1" to="/activityMessage">活动信息</MenuItem>
              <MenuItem name="4-2" to="/activityClass">活动分类</MenuItem>
            </Submenu>
          </Menu>
        </Sider>
        <Layout :style="{ padding: '0 24px 24px' }">      
          <Content
            :style="{ padding: '24px', minHeight: '280px', background: '#fff' }"
          >
            <router-view />
          </Content>
        </Layout>
      </Layout>
      <Footer class="layout-footer-center">2011-2016 &copy; 湖南财政经济学院校青年志愿者协会</Footer>
    </Layout>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
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
  background-color: #f5f7f9!important;
}
/*  */
.ivu-layout {
  height: 100%;
}
</style>
