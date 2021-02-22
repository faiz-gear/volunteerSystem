<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "ContentManage",
};
</script>
<style>
#content {
  width: calc(100% - 240px - 5px - 20px);
  max-height: calc(100% - 80px - 150px);
  min-height: 600px;
  background-color: #fff;
  margin-left: 10px;
  box-shadow: 5px 0px 5px rgba(0, 0, 0, 0.2);
  /* overflow: hidden; */
  /* 决定分页栏位置 */
  position: relative;
  animation: move 1s ease forwards;
}
@keyframes move {
  0% {
    transform: translateX(100px);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}
#content:hover {
  box-shadow: 10px 8px 5px rgba(0, 0, 0, 0.1);
}
</style>