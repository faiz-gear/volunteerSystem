<template>
  <div class="toast" v-show="showToast">
    <div class="wrapper">
      <div class="toast_top">
        <h2>{{title}}<span @click="closeToast">×</span></h2>
      </div>
      <div class="toast_content">
        <slot name="toast_content"></slot>
      </div>
      <div class="toast_bottom">
        <Button class="r" @click="closeToast">关闭</Button>
        <Button class="r" type="success" @click="submit">提交</Button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Toast",
  props: {
    showToast: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '添加志愿者'
    }
  },
  methods: {
    closeToast() {
      this.$emit('closeToast');
    },
    submit() {
      this.$emit("submit");
    },
  },
};
</script>

<style scoped>
.toast {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 999;
  background: rgba(0, 0, 0, 0.5);
}
.wrapper {
  position: absolute;
  width: 400px;
  height: 430px;
  transform: translate(50%, -50%);
  top: 50%;
  right: 50%;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
  animation: move 0.5s ease forwards;
}
@keyframes move {
  0% {
    right: 0;
  }
  60% {
    right: 52%;
  }
  80% {
    right: 48%;
  }
  100% {
    right: 50%;
  }
}
.toast_top {
  height: 50px;
  box-sizing: border-box;
  padding: 5px 0;
  /* border-bottom: 1px solid #ccc; */
}
.toast_top h2 {
  position: relative;
  font-size: 20px;
  line-height: 40px;
  text-align: center;
  font-weight: bold;
}
.toast_top h2 span {
  position: absolute;
  right: 5px;
  width: 20px;
  height: 20px;
  line-height: 20px;
  font-size: 20px;
  color: #ccc;
  cursor: pointer;
}
.toast_top h2 span:hover {
  color: #000;
}
.toast_content {
  width: 100%;
  box-sizing: border-box;
  /* padding-top: 20px; */
}
.toast_content > div > div {
  padding-left: 80px;
}
/* .toast_bottom {
  margin-top: 40px;
} */
/* 按钮位置 */
.toast_bottom .r {
  margin-right: 20px;
}
</style>