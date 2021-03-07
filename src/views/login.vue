<template>
  <div id="login">
    <div class="container">
      <h1>志愿者管理系统</h1>
      <Form ref="formInline" :model="formInline" :rules="ruleInline">
        <FormItem prop="user">
          <Input type="text" v-model="formInline.user" placeholder="用户名">
            <Icon type="ios-person-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="password">
          <Input
            type="password"
            v-model="formInline.password"
            placeholder="密码"
          >
            <Icon type="ios-lock-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem>
          <Button
            type="success"
            @click="handleSubmit('formInline')"
            style="width: 100%"
            >登录</Button
          >
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      formInline: {
        user: "",
        password: "",
      },
      ruleInline: {
        user: [
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
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          console.log(this.formInline);
          this.$axios({
            method: "post",
            url: "http://127.0.0.1/login",
            data: this.formInline,
          }).then((res) => {
            console.log(res);
            if (res.data.status !== 0)
              return this.$Message.error("用户名或密码错误!");
            this.$Message.success("登录成功!");
            
            this.$router.push({
              path: "/index",
            });
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
}
h1 {
  text-align: center;
  color: #fff;
  height: 40px;
  line-height: 40px;
}
</style>