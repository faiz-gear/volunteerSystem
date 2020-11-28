<template>
  <div id="header">
        <div class="header_logo l">
            <img class="header_logo_img" src="../../../assets/img/mi-logo.png" alt="">
            <h1 class="header_logo_title">志愿者管理信息系统</h1>
        </div>
        <div class="header_right r">
            <span><a href="#">欢迎你，管理员</a></span><i class="iconfont iconxia"></i>
            <ul>
                <li><a href="#">修改密码</a></li>
                <li><a href="#">退出登录</a></li>
            </ul>
        </div>
  </div>
</template>

<script>
export default {
    name:'Header'
}
</script>

<style>
    /* 头部 */
    #header{
        height: 80px;
        background: linear-gradient(to right,#0abde3,#48dbfb);
        box-shadow: 0 0px 5px rgba(0,0,0,.1);
    }
    #header:hover{
        box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.1);
    }
    /* 头部logo */
    .header_logo{
        height: 100%;
        width: 300px;
        line-height: 80px;
        margin-left: 30px;
    }
    .header_logo_img{
        vertical-align: middle;
    }
    .header_logo_title{
        font-size: 18px;
        color: #fff;
        display: inline-block;
    }
    /* 头部右边 */
    .header_right{
        width: 130px;
        height: 87px;
        position: relative;
        margin-right: 70px;
    }
    .header_right span{
        vertical-align: middle;
        display: inline-block;
        line-height: 80px;
        margin-right: 10px;
    }
    .header_right span a{
        font-size: 14px;
        color: #fff;
    }
    /* 向下箭头 */
    .header_right i{
        color: #fff;
        display: inline-block;
        transform: rotate(180deg);
        transition: .2s ease;
    }
    /* 修改密码、退出登录 */
    .header_right ul{
        position: absolute;
        width: 120px;
        margin-top: 10px;
        z-index: 99;
        box-shadow: 0 5px 5px rgba(0,0,0,.1);
        display: none;
    }
    .header_right ul li {
        background-color: #fff;
        text-align: center;
        padding: 5px 0;
    }
    .header_right ul li:nth-child(1){
        border-bottom: 1px solid #ccc;
    }
    .header_right ul li a{
        font-size: 14px;
        color: #999;
        width: 100%;
        height: 40px;
        display: inline-block;
        line-height: 40px;
    }
    /* 鼠标移入 */
    .header_right ul li a:hover{
        color: #48dbfb;
        /* background-color: #cef6ff; */
    }
    .header_right:hover ul{
        display: block;
    }
    .header_right:hover .iconxia{
        transform: rotate(360deg);
    }
    /* 小箭头 */
    .header_right ul::before{
        content: '';
        position: absolute;
        width: 0;
        height: 0;
        top: -7px;
        left: 46px;
        border-top: 14px solid transparent;
        border-left: 14px solid #fff;
        transform: rotate(135deg);
}
</style>