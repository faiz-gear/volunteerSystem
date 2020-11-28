<template>
  <div id="content" class="l">
    <content-manage name="volunteerMessage">
      <div class="content_top">
        <Breadcrumb>
        <BreadcrumbItem >志愿者管理</BreadcrumbItem>
        <BreadcrumbItem to="/volunteerMessage">志愿者信息</BreadcrumbItem>
    </Breadcrumb>
        <div class="top_right r">
           <Select v-model="model" style="width:100px" class="r" placeholder="级别">
             <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
           </Select>
          <Input search enter-button placeholder="请输入姓名/学号..."  class="r bianju"/>
        </div>
      </div>
      <div class="content_main">
        <Table  :columns="columns" :data="historyData" >
          <template slot-scope="{ row, index }" slot="id">
              <Input type="text" v-model="editId" v-if="editIndex === index" width="50%"/>
              <span v-else>{{ row.id }}</span>
          </template>
          <template slot-scope="{ row, index }" slot="name">
              <Input type="text" v-model="editName" v-if="editIndex === index" width="50%"/>
              <span v-else>{{ row.name }}</span>
          </template>
          <template slot-scope="{ row, index }" slot="sex">
              <Input type="text" v-model="editSex" v-if="editIndex === index" width="50%"/>
              <span v-else>{{ row.sex }}</span>
          </template>
          <template slot-scope="{ row, index }" slot="grade">
              <Input type="text" v-model="editGrade" v-if="editIndex === index" width="50%"/>
              <span v-else>{{ row.grade }}</span>
          </template>
          <template slot-scope="{ row, index }" slot="class">
              <Input type="text" v-model="editClass" v-if="editIndex === index" width="50%"/>
              <span v-else>{{ row.class }}</span>
          </template>
          <template slot-scope="{ row, index }" slot="phone">
              <Input type="text" v-model="editPhone" v-if="editIndex === index" width="50%"/>
              <span v-else>{{ row.phone }}</span>
          </template>
          <template slot-scope="{ row, index }" slot="action">
          <div v-if="editIndex === index">
            <Button @click="handleSave(index)">保存</Button>
            <Button @click="editIndex = -1">取消</Button>
            <Button type="error" @click="remove(index)">删除</Button>
          </div>
          <div v-else>
              <Button @click="handleEdit(row, index)">操作</Button>
          </div>       
        </template>
        </Table>
         <page style="position: absolute;right: 82px;bottom:-42px;" :total="dataCount" :page-size="pageSize" @on-change="changePage" show-elevator></page>
      </div>
    </content-manage>
  </div>
</template> 

<script>
import ContentManage from "../../components/common/contentManage/ContentManage";

export default {
  name: "Voluteer",
  components: {
    ContentManage,
  },
  data(){
    return{
      cityList: [
                    {
                        value: '2020级',
                        label: '2020级'
                    },
                    {
                        value: '2019级',
                        label: '2019级'
                    },
                    {
                        value: '2018级',
                        label: '2018级'
                    },
                    {
                        value: '2017级',
                        label: '2017级'
                    },
                    {
                        value: '2016级',
                        label: '2016级'
                    },
                    {
                        value: '2015级',
                        label: '2015级'
                    }
                ],
      model:'',
      columns: [
                    
                    {
                        title: '学号',
                        slot: 'id',
                        sortable: true
                    },
                    {
                        title: '姓名',
                        slot: 'name'
                    },
                    {
                        title: '性别',
                        slot: 'sex',
                    },
                    {
                        title: '级别',
                        slot: 'grade'
                    },
                    {
                        title: '班级',
                        slot: 'class'
                    },
                    {
                        title: '电话',
                        slot: 'phone'
                    },
                    {
                        title:'操作',
                        slot:'action',
                        width:220,
                        align:'center'
                    }
                ],
                // 测试数据
                data: [
                    {
                        id: '201705200109',
                        name: '张三',
                        sex: '男',
                        date: '2016-10-03',
                        grade:'2017',
                        class:'电商一班',
                        phone:'15616015756'
                    },
                    {
                        id: '201705200102',
                        name: '张三',
                        sex: '男',
                        date: '2016-10-03',
                        grade:'2017',
                        class:'电商一班',
                        phone:'15616015756'
                    },
                    {
                        id: '201705200103',
                        name: '李四',
                        sex: '男',
                        date: '2016-10-03',
                        grade:'2017',
                        class:'电商一班',
                        phone:'15616015756'
                    },
                    {
                        id: '201705200105',
                        name: '李四',
                        sex: '男',
                        date: '2016-10-03',
                        grade:'2017',
                        class:'电商一班',
                        phone:'15616015756'
                    },
                    {
                        id: '201705200101',
                        name: '李四',
                        sex: '男',
                        date: '2016-10-03',
                        grade:'2017',
                        class:'电商一班',
                        phone:'15616015756'
                    },
                    {
                        id: '201705200101',
                        name: '李四',
                        sex: '男',
                        date: '2016-10-03',
                        grade:'2017',
                        class:'电商一班',
                        phone:'15616015756'
                    },
                    {
                        id: '201705200101',
                        name: '李四',
                        sex: '男',
                        date: '2016-10-03',
                        grade:'2017',
                        class:'电商一班',
                        phone:'15616015756'
                    },
                    {
                        id: '201705200101',
                        name: '李四',
                        sex: '男',
                        date: '2016-10-03',
                        grade:'2017',
                        class:'电商一班',
                        phone:'15616015756'
                    },
                    {
                        id: '201705200101',
                        name: '李四',
                        sex: '男',
                        date: '2016-10-03',
                        grade:'2017',
                        class:'电商一班',
                        phone:'15616015756'
                    },
                    {
                        id: '201705200101',
                        name: '李四',
                        sex: '男',
                        date: '2016-10-03',
                        grade:'2017',
                        class:'电商一班',
                        phone:'15616015756'
                    },
                    {
                        id: '201705200101',
                        name: '李四',
                        sex: '男',
                        date: '2016-10-03',
                        grade:'2017',
                        class:'电商一班',
                        phone:'15616015756'
                    },
                    {
                        id: '201705200101',
                        name: '李四',
                        sex: '男',
                        date: '2016-10-03',
                        grade:'2017',
                        class:'电商一班',
                        phone:'15616015756'
                    },
                    {
                        id: '201705200101',
                        name: '李四',
                        sex: '男',
                        date: '2016-10-03',
                        grade:'2017',
                        class:'电商一班',
                        phone:'15616015756'
                    },
                    {
                        id: '201705200101',
                        name: '李四',
                        sex: '男',
                        date: '2016-10-03',
                        grade:'2017',
                        class:'电商一班',
                        phone:'15616015756'
                    },
                    {
                        id: '201705200101',
                        name: '李四',
                        sex: '男',
                        date: '2016-10-03',
                        grade:'2017',
                        class:'电商一班',
                        phone:'15616015756'
                    },
                    {
                        id: '201705200101',
                        name: '李四',
                        sex: '男',
                        date: '2016-10-03',
                        grade:'2017',
                        class:'电商一班',
                        phone:'15616015756'
                    },
                    {
                        id: '201705200101',
                        name: '李四',
                        sex: '男',
                        date: '2016-10-03',
                        grade:'2017',
                        class:'电商一班',
                        phone:'15616015756'
                    },
                    {
                        id: '201705200101',
                        name: '李四',
                        sex: '男',
                        date: '2016-10-03',
                        grade:'2017',
                        class:'电商一班',
                        phone:'15616015756'
                    },
                     {
                        id: '201705200101',
                        name: '王五',
                        sex: '男',
                        date: '2016-10-03',
                        grade:'2017',
                        class:'电商一班',
                        phone:'15616015756'
                    },
                    {
                        id: '201705200101',
                        name: '王五',
                        sex: '男',
                        date: '2016-10-03',
                        grade:'2017',
                        class:'电商一班',
                        phone:'15616015756'
                    },
                    {
                        id: '201705200101',
                        name: '王五',
                        sex: '男',
                        date: '2016-10-03',
                        grade:'2017',
                        class:'电商一班',
                        phone:'15616015756'
                    },
                    {
                        id: '201705200101',
                        name: '王五',
                        sex: '男',
                        date: '2016-10-03',
                        grade:'2018',
                        class:'电商一班',
                        phone:'15616015756'
                    },
                    {
                        id: '201705200101',
                        name: '王五',
                        sex: '女',
                        date: '2016-10-03',
                        grade:'2018',
                        class:'电商一班',
                        phone:'15616015756'
                    },
                    {
                        id: '201705200101',
                        name: '王五',
                        sex: '女',
                        date: '2016-10-03',
                        grade:'2018',
                        class:'电商一班',
                        phone:'15616015756'
                    },
                    {
                        id: '201705200101',
                        name: '王五',
                        sex: '女',
                        date: '2016-10-03',
                        grade:'2018',
                        class:'电商一班',
                        phone:'15616015756'
                    },
                    {
                        id: '201705200101',
                        name: '王五',
                        sex: '女',
                        date: '2016-10-03',
                        grade:'2018',
                        class:'电商一班',
                        phone:'15616015756'
                    },
                    {
                        id: '201705200101',
                        name: '王五',
                        sex: '女',
                        date: '2016-10-03',
                        grade:'2018',
                        class:'电商一班',
                        phone:'15616015756'
                    },
                    {
                        id: '201705200101',
                        name: '王五',
                        sex: '女',
                        date: '2016-10-03',
                        grade:'2018',
                        class:'电商一班',
                        phone:'15616015756'
                    },
                    {
                        id: '201705200101',
                        name: '王五',
                        sex: '女',
                        date: '2016-10-03',
                        grade:'2018',
                        class:'电商一班',
                        phone:'15616015756'
                    },
                    {
                        id: '201705200101',
                        name: '王五',
                        sex: '女',
                        date: '2016-10-03',
                        grade:'2018',
                        class:'电商一班',
                        phone:'15616015756'
                    },
                    {
                        id: '201705200101',
                        name: '王五',
                        sex: '女',
                        date: '2016-10-03',
                        grade:'2018',
                        class:'电商一班',
                        phone:'15616015756'
                    },
                    {
                        id: '201705200101',
                        name: '王五',
                        sex: '女',
                        date: '2016-10-03',
                        grade:'2018',
                        class:'电商一班',
                        phone:'15616015756'
                    },
                    {
                        id: '201705200101',
                        name: '王五',
                        sex: '女',
                        date: '2016-10-03',
                        grade:'2018',
                        class:'电商一班',
                        phone:'15616015756'
                    },
                    {
                        id: '201705200101',
                        name: '王五',
                        sex: '女',
                        date: '2016-10-03',
                        grade:'2018',
                        class:'电商一班',
                        phone:'15616015756'
                    },
                    {
                        id: '201705200101',
                        name: '王五',
                        sex: '女',
                        date: '2016-10-03',
                        grade:'2018',
                        class:'电商一班',
                        phone:'15616015756'
                    },
                    {
                        id: '201705200101',
                        name: '王五',
                        sex: '女',
                        date: '2016-10-03',
                        grade:'2018',
                        class:'电商一班',
                        phone:'15616015756'
                    },
                     {
                        id: '201705200101',
                        name: '王五',
                        sex: '女',
                        date: '2016-10-03',
                        grade:'2017',
                        class:'电商一班',
                        phone:'15616015756'
                    },
                    {
                        id: '201705200101',
                        name: '赵六',
                        sex: '女',
                        date: '2016-10-03',
                        grade:'2017',
                        class:'电商一班',
                        phone:'15616015756'
                    },
                    {
                        id: '201705200101',
                        name: '赵六',
                        sex: '女',
                        date: '2016-10-03',
                        grade:'2017',
                        class:'电商一班',
                        phone:'15616015756'
                    },
                    {
                        id: '201705200101',
                        name: '赵六',
                        sex: '女',
                        date: '2016-10-03',
                        grade:'2017',
                        class:'电商一班',
                        phone:'15616015756'
                    },
                    {
                        id: '201705200101',
                        name: '赵六',
                        sex: '男',
                        date: '2016-10-03',
                        grade:'2017',
                        class:'电商一班',
                        phone:'15616015756'
                    },
                    {
                        id: '201705200101',
                        name: '赵六',
                        sex: '男',
                        date: '2016-10-03',
                        grade:'2017',
                        class:'电商一班',
                        phone:'15616015756'
                    },
                    {
                        id: '201705200101',
                        name: '赵六',
                        sex: '男',
                        date: '2016-10-03',
                        grade:'2017',
                        class:'电商一班',
                        phone:'15616015756'
                    },
                    {
                        id: '201705200101',
                        name: '赵六',
                        sex: '男',
                        date: '2016-10-03',
                        grade:'2017',
                        class:'电商一班',
                        phone:'15616015756'
                    },
                    {
                        id: '201705200101',
                        name: '赵六',
                        sex: '男',
                        date: '2016-10-03',
                        grade:'2017',
                        class:'电商一班',
                        phone:'15616015756'
                    },
                    {
                        id: '201705200101',
                        name: '赵六',
                        sex: '男',
                        date: '2016-10-03',
                        grade:'2017',
                        class:'电商一班',
                        phone:'15616015756'
                    },
                    {
                        id: '201705200101',
                        name: '赵六',
                        sex: '男',
                        date: '2016-10-03',
                        grade:'2017',
                        class:'电商一班',
                        phone:'15616015756'
                    },
                    {
                        id: '201705200101',
                        name: '赵六',
                        sex: '男',
                        date: '2016-10-03',
                        grade:'2017',
                        class:'电商一班',
                        phone:'15616015756'
                    },
                    {
                        id: '201705200101',
                        name: '赵六',
                        sex: '男',
                        date: '2016-10-03',
                        grade:'2017',
                        class:'电商一班',
                        phone:'15616015756'
                    },
                    {
                        id: '201705200101',
                        name: '赵六',
                        sex: '男',
                        date: '2016-10-03',
                        grade:'2017',
                        class:'电商一班',
                        phone:'15616015756'
                    },
                    {
                        id: '201705200101',
                        name: '赵六',
                        sex: '男',
                        date: '2016-10-03',
                        grade:'2017',
                        class:'电商一班',
                        phone:'15616015756'
                    },
                    {
                        id: '201705200101',
                        name: '赵六',
                        sex: '男',
                        date: '2016-10-03',
                        grade:'2017',
                        class:'电商一班',
                        phone:'15616015756'
                    },
                    {
                        id: '201705200100',
                        name: '赵六',
                        sex: '男',
                        date: '2016-10-03',
                        grade:'2017',
                        class:'电商一班',
                        phone:'15616015756'
                    },
                    {
                        id: '201705200101',
                        name: '赵六',
                        sex: '女',
                        date: '2016-10-03',
                        grade:'2017',
                        class:'电商一班',
                        phone:'15616015756'
                    },  
                ],
                // 操作的数据存储:与 data 分离避免重构的闪烁
                editIndex:'-1',
                editName: '',
                editId:'',
                editSex:'',
                editGrade:'',
                editClass:'',
                editPhone:'',

                // 实现分页：
                // 初始化信息存储
                ajaxHistoryData:[],
                // 初始化信息总条数
                dataCount:0,
                // 每页显示条数
                pageSize:13,
                // 当前页码
                page:1,
                // 每页显示信息存储
                historyData:[]

    }
  },
  created(){
    
    var compare = function(name){  
      return function(o, p){  
        var a, b;  
        if (typeof o === "object" && typeof p === "object" && o && p) {  
          a = o[name];  
          b = p[name];  
          if (a === b) {  
            return 0;  
          }  
          // if (typeof a === typeof b) {  
          //   return a < b ? -1 : 1;  
          // }  
          return  a <  b ? -1 : 1;  
        }  
        else {  
          throw ("error");  
        }  
      }  
    }  
    this.data.sort(compare("id"))
    console.log(this.data);
    this.handleListHistory();
  },
  methods:{
    remove(index){
      this.historyData.splice(index,1)
    //   console.log(index);
      this.editIndex = -1;
      this.$router.replace('/volunteerMessage')
    },
    handleEdit(row, index){
      this.editIndex = index;
      this.editName = row.name;
      this.editId = row.id;
      this.editSex = row.sex;
      this.editGrade = row.grade;
      this.editClass = row.class;
      this.editPhone = row.phone;
    },
    handleSave(index){
      this.data[index].id = this.editId;
      this.data[index].name = this.editName;
      this.data[index].sex = this.editSex;
      this.data[index].grade = this.editGrade;
      this.data[index].class = this.editClass;
      this.data[index].phone = this.editPhone;
      this.editIndex = -1;
    },
    // 获取历史记录信息
    handleListHistory(){
      // 保存取到的所有数据
      this.ajaxHistoryData = this.data;
      this.dataCount = this.data.length;
      // console.log(this.data);
      if(this.ajaxHistoryData.length <= this.pageSize){
        this.historyData = this.ajaxHistoryData;
      }
      else{
        this.historyData = this.ajaxHistoryData.slice(0,this.pageSize)
      }
    },
    changePage(index){
      this.page = index;
      let _start = (index - 1) * this.pageSize;
      let _end = index * this.pageSize;
      this.historyData = this.ajaxHistoryData.slice(_start,_end);
    }
  }
};
</script>
  
<style>
.bianju {
  margin-right: 10px;
}
.content_top {
  height: 40px;
  background-color: #f0f2f5;
}
.content_top .top_title {
  line-height: 40px;
  font-weight: bold;
  margin-left: 20px;
}
.content_top .top_right {
  margin-right: 20px;
  width: calc(100% - 200px);
}

/* 面包屑样式 */
.ivu-breadcrumb{
  display: inline;
  line-height: 40px;
}
/* 搜索框样式 */
.ivu-input-wrapper{
  width: 200px!important;
}

.ivu-input {
  width: 50%;
}
</style>