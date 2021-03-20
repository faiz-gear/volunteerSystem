<template>
  <div id="login">
    <div class="container">
      <div class="login" v-show="flag">
        <h1>志愿者管理系统</h1>
        <Form ref="login" :model="formInline" :rules="ruleInline">
          <FormItem prop="username">
            <Input
              type="text"
              v-model="formInline.username"
              placeholder="用户名"
            >
              <Icon
                type="ios-contact-outline"
                slot="prepend"
                style="fontsize: 16px"
              ></Icon>
            </Input>
          </FormItem>
          <FormItem prop="password">
            <Input
              type="password"
              v-model="formInline.password"
              placeholder="密码"
            >
              <Icon
                type="ios-lock-outline"
                slot="prepend"
                style="fontsize: 16px"
              ></Icon>
            </Input>
          </FormItem>
          <FormItem>
            <Button type="success" @click="login('login')" style="width: 100%"
              >登录</Button
            >
          </FormItem>
          <div class="toReg" @click="toReg">没账号？去注册</div>
        </Form>
      </div>
      <div class="register" v-show="!flag">
        <h1>志愿者管理系统</h1>
        <Form ref="register" :model="formInline" :rules="ruleInline">
          <FormItem prop="username">
            <Input
              type="text"
              v-model="formInline.username"
              placeholder="用户名"
            >
              <Icon
                type="ios-contact-outline"
                slot="prepend"
                style="fontsize: 16px"
              ></Icon>
            </Input>
          </FormItem>
          <FormItem prop="password">
            <Input
              type="password"
              v-model="formInline.password"
              placeholder="密码"
            >
              <Icon
                type="ios-lock-outline"
                slot="prepend"
                style="fontsize: 16px"
              ></Icon>
            </Input>
          </FormItem>
          <FormItem>
            <Button type="success" @click="reg('register')" style="width: 100%"
              >注册</Button
            >
          </FormItem>
          <div class="toReg" @click="toLogin">去登录</div>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
import { loginRequest, registerRequest } from "../network/user";

export default {
  name: "Login",
  data() {
    return {
      flag: true,
      formInline: {
        username: "",
        password: "",
      },
      ruleInline: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
          {
            type: "string",
            min: 6,
            message: "密码长度不能小于六位",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    toReg() {
      this.flag = false;
    },
    toLogin() {
      this.flag = true;
    },
    login(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          loginRequest(this.formInline).then((res) => {
            if (res.status !== 0) return this.$Message.error(res.message);
            this.$Message.success(res.message);
            this.$store.commit("set_token", res.token);
            this.$router.push({
              path: "/index",
            });
          });
        } else {
          this.$Message.error("请输入!");
        }
      });
    },
    reg(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
         registerRequest(this.formInline).then((res) => {
            if (res.status === 1)
              return this.$Message.error(res.message);
            this.$Message.success(res.message);
            this.toLogin();
          });
        } else {
          this.$Message.error("请输入!");
        }
      });
    },
  },
};
</script>

<style scoped>
#login {
  width: 100%;
  height: 100%;
  background: url("../assets/img/login_bg.jpg") no-repeat center;
  background-size: cover;
}
.container {
  position: relative;
  width: 320px;
  height: 300px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* background-color: #fff; */
  border-radius: 5px;
}
h1 {
  text-align: center;
  color: #fff;
  height: 40px;
  line-height: 40px;
}
.toReg {
  text-align: right;
}
.toReg:hover {
  color: #fff;
  cursor: pointer;
}
</style>