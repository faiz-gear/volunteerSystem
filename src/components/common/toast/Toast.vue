<template>
  <div class="toast">
    <div class="wrapper">
      <div class="toast_top">
        <slot name="toast_top"></slot>
      </div>
      <div class="toast_content">
        <slot name="toast_content"></slot>
      </div>
      <div class="toast_bottom">
          <slot name="toast_bottom"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Toast",
  methods: {

  },
};
</script>

<style scoped>
.toast {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 999;
  background: rgba(0, 0, 0, 0.5);
}
.wrapper {
  position: fixed;
  width: 600px;
  height: 600px;
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
  height: 100px;
  box-sizing: border-box;
  padding: 30px 0;
  border-bottom: 1px solid #ccc;
}
.toast_top h2 {
  position: relative;
  font-size: 25px;
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
    padding-top: 20px;
}
.toast_content>div>div{
    padding-left: 80px;
}

</style>