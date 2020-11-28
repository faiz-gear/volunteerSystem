<template>
  <div id="footer" class="l">
      Copyright<i></i>2019
  </div>
</template>

<script>
export default {
    name: 'FooterManage'
}
</script>

<style>
    #footer{
        width: calc(100% - 239px);
        height: 150px;
        text-align: center;
        margin-top: 50px;
        /* background-color: #fff; */
    }
    #footer i::before{
        content: '';
        display: inline-block;
        background: url('../../../assets/img/copyright.svg') no-repeat;
        width: 16px;
        height: 16px;
    }
</style>