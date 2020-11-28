<template>
  <div>
      <slot></slot>
  </div>
</template>

<script>
export default {
    name: 'ContentManage'
}
</script>
<style>
    #content{      
        width: calc(100%  - 240px - 5px);
        max-height: calc(100% - 80px - 150px);
        min-height: 600px;
        background-color: #fff;
        margin-left: 5px;
        box-shadow: 5px 0px 5px rgba(0,0,0,.2);
        /* overflow: hidden; */
        /* 决定分页栏位置 */
        position: relative;
    }
    #content:hover{
        box-shadow: 10px 8px 5px rgba(0,0,0,.1)
    }
</style>