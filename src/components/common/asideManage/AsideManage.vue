<template>
  <div id="aside" class="l">
        <!-- <div class="aside_menu">
            <aside-manage-list :list-title="['志愿者管理']" :list-icon="['iconwj-zyzdj']" 
                               :list-item-title="['志愿者信息']" :list-item-icon="['']">
                               </aside-manage-list>
            <aside-manage-list :list-title="['部门管理']" :list-icon="['iconbumen']" 
                               :list-item-title="['部门分类','部门成员']" :list-item-icon="['']">
                               </aside-manage-list>
            <aside-manage-list :list-title="['文件管理']" :list-icon="['iconwenjian']" 
                               :list-item-title="['活动策划文件','其他文件']" :list-item-icon="['']">
                               </aside-manage-list>
            <aside-manage-list :list-title="['活动管理']" :list-icon="['iconhuodong']" 
                               :list-item-title="['活动信息','活动分类']" :list-item-icon="['']">
                               </aside-manage-list>
        </div> -->
       <div>
           <Menu >
                <Submenu name="1">
                    <template slot="title">
                        <Icon custom="iconfont iconwj-zyzdj" />
                        志愿者管理
                    </template>
                    <MenuItem name="1-1" to="/volunteerMessage">志愿者信息</MenuItem>
                </Submenu>
                <Submenu name="2">
                    <template slot="title">
                        <Icon custom="iconfont iconbumen" />
                        部门管理
                    </template>
                    <MenuItem name="2-1" to="/departmentClass">部门分类</MenuItem>
                    <MenuItem name="2-2" to="/departmentMember">部门成员</MenuItem>
                </Submenu>
                <Submenu name="3">
                    <template slot="title">
                        <Icon custom="iconfont iconwenjian" />
                        文件管理
                    </template>
                        <MenuItem name="3-1" to="/filePlan">活动策划文件</MenuItem>
                        <MenuItem name="3-2" to="/fileOther">其他文件</MenuItem>
                </Submenu>
                <Submenu name="4">
                    <template slot="title">
                        <Icon custom="iconfont iconhuodong" />
                        活动管理
                    </template>
                        <MenuItem name="4-1" to="/activityMessage">活动信息</MenuItem>
                        <MenuItem name="4-2" to="/activityClass">活动分类</MenuItem>
                </Submenu>
            </Menu>
       </div>
  </div>
</template>

<script>
// import AsideManageList from'./AsideManageList'

export default {
    name:'Aside',
    components: {
        // AsideManageList
    },
    methods:{
        // vmClick(){
        //     this.$router.replace('/volunteerMessage')
        // }
    }

}
</script>

<style>
    /*  边栏样式*/
    #aside{
        background-color: #fff;
        width: 239px;
        height: 100%;
        box-shadow: 5px -5px 5px rgba(0,0,0,.1);
    }
    #aside:hover{
        box-shadow: 10px -5px 5px rgba(0,0,0,.1)
    }
    
</style>