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
  width: 100%;
  height: 100%;
  background-color: #fff;
  /* position: relative; */
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