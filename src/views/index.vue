<template>
  <Layout>
    <Header>
      <Menu mode="horizontal" theme="dark" active-name="1">
        <div class="layout-logo"></div>
        <div class="layout-nav">
          <MenuItem name="1">
            <Icon type="ios-person" />
            <span @click="exit">欢迎您：{{ username }}</span>
          </MenuItem>
          <MenuItem name="1">
            <Icon type="md-exit" />
            <span @click="exit">退出登录</span>
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
            <MenuItem name="1-1" to="/index/volunteerMessage"
              >志愿者信息</MenuItem
            >
          </Submenu>
          <Submenu name="2">
            <template slot="title">
              <Icon type="ios-home"></Icon>
              部门管理
            </template>
            <MenuItem name="2-1" to="/index/departmentClass">部门分类</MenuItem>
            <MenuItem name="2-2" to="/index/departmentMember"
              >部门成员</MenuItem
            >
          </Submenu>
          <Submenu name="3">
            <template slot="title">
              <Icon type="md-folder-open"></Icon>
              文件管理
            </template>
            <MenuItem name="3-1" to="/index/filePlan">活动策划文件</MenuItem>
            <MenuItem name="3-2" to="/index/fileOther">其他文件</MenuItem>
          </Submenu>
          <Submenu name="4">
            <template slot="title">
              <Icon type="md-walk"></Icon>
              活动管理
            </template>
            <MenuItem name="4-1" to="/index/activityMessage">活动信息</MenuItem>
            <MenuItem name="4-2" to="/index/activityClass">活动分类</MenuItem>
          </Submenu>
        </Menu>
      </Sider>
      <Layout :style="{ padding: '0 24px 24px' }">
        <Content
          :style="{ padding: '24px', minHeight: '280px', background: '#fff' }"
        >
          <keep-alive>
            <router-view />
          </keep-alive>
        </Content>
      </Layout>
    </Layout>
    <Footer class="layout-footer-center"
      >2003-2021 &copy; 湖南财政经济学院校青年志愿者协会</Footer
    >
  </Layout>
</template>

<script>
import { getUserInfo } from '../network/user'

export default {
  name: "Index",
  data() {
    return {
      username: "",
    };
  },
  created() {
    this.$Spin.show();
    getUserInfo().then((res) => {
      if (res.status !== 0) {
        this.$router.push({
          path: "/login",
        });
        this.$Message.error("请先登录!");
      } else {
        this.username = res.data.username;
        this.$Spin.hide();
      }
    });
  },
  methods: {
    exit() {
      this.$Modal.confirm({
        title: "确认退出登录吗？",
        onOk: () => {
          localStorage.removeItem("token");
          this.$router.push({
            path: "/login",
          });
          this.$Message.info("退出登录成功!");
        },
      });
    },
  },
};
</script>

<style>
</style>