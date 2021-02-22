<template>
  <div id="content" class="l">
    <content-manage name="volunteerMessage">
      <div class="content_top">
        <Breadcrumb class="mgleft">
          <BreadcrumbItem>志愿者管理</BreadcrumbItem>
          <BreadcrumbItem to="/volunteerMessage">志愿者信息</BreadcrumbItem>
        </Breadcrumb>
        <div class="top_right r clear">
          <Select
            v-model="model"
            style="width: 100px"
            class="bianju"
            placeholder="级别"
            @on-change="showGrade"
          >
            <Option
              v-for="item in cityList"
              :value="item.value"
              :key="item.value"
              >{{ item.label }}</Option
            >
          </Select>
          <Input
            search
            enter-button
            placeholder="请输入姓名..."
            class="bianju"
            @on-search="volSearch"
          />
          <Button type="info" class="bianju" @click="showToast"
            >添加志愿者</Button
          >
        </div>
      </div>
      <div class="content_main">
        <Table
          :columns="columns"
          :data="showData"
          @on-sort-change="sortChanged"
        >
          <template slot-scope="{ row, index }" slot="id">
            <Input
              type="text"
              v-model="editId"
              v-if="editIndex === index"
              width="50%"
            />
            <span v-else>{{ row.id }}</span>
          </template>
          <template slot-scope="{ row, index }" slot="name">
            <Input
              type="text"
              v-model="editName"
              v-if="editIndex === index"
              width="50%"
            />
            <span v-else>{{ row.name }}</span>
          </template>
          <template slot-scope="{ row, index }" slot="sex">
            <Input
              type="text"
              v-model="editSex"
              v-if="editIndex === index"
              width="50%"
            />
            <span v-else>{{ row.sex }}</span>
          </template>
          <template slot-scope="{ row, index }" slot="grade">
            <Input
              type="text"
              v-model="editGrade"
              v-if="editIndex === index"
              width="50%"
            />
            <span v-else>{{ row.grade }}</span>
          </template>
          <template slot-scope="{ row, index }" slot="class">
            <Input
              type="text"
              v-model="editClass"
              v-if="editIndex === index"
              width="50%"
            />
            <span v-else>{{ row.class }}</span>
          </template>
          <template slot-scope="{ row, index }" slot="phone">
            <Input
              type="text"
              v-model="editPhone"
              v-if="editIndex === index"
              width="50%"
            />
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
        <page
          style="position: absolute; right: 82px; bottom: -52px"
          :total="dataCount"
          :page-size="pageSize"
          @on-change="changePage"
          show-elevator
        ></page>
      </div>
    </content-manage>
    <toast v-show="isShowToast" @click="showToast">
      <h2 slot="toast_top">
        添加志愿者<span @click="closeToast">×</span>
        {{ newdata }}
      </h2>
      <div slot="toast_content">
        <div>
          <span>学号</span>
          <Input
            type="number"
            v-model="newdata.id"
            placeholder="请输入学号..."
            @on-blur="chargeNum(newdata.id, 0, 12, '学号')"
          />
          <span class="warning">学号不能为空！</span>
        </div>
        <div>
          <span>姓名</span>
          <Input clearable v-model="newdata.name" placeholder="请输入姓名..."  @on-blur="chargeText(newdata.name, 1, '姓名')" />
          <span class="warning">姓名不能为空！</span>
        </div>
        <div>
          <span>性别</span>
          <RadioGroup v-model="newdata.sex" value="男" >
            <Radio checked label="男">
              <span>男</span>
            </Radio>
            <Radio label="女">
              <span>女</span>
            </Radio>
            <span class="warning">性别不能为空！</span>
          </RadioGroup>
        </div>
        <div>
          <span>级别</span>
          <Input
            clearable
            v-model="newdata.grade"
            placeholder="请输入级别..."
            @on-blur="chargeText(newdata.grade, 3, '级别')"
          />
          <span class="warning">级别不能为空！</span>
        </div>
        <div>
          <span>班级</span>
          <Input
            clearable
            v-model="newdata.class"
            placeholder="请输入班级..."
            @on-blur="chargeText(newdata.class, 4, '年级')"
          />
          <span class="warning">班级不能为空！</span>
        </div>
        <div>
          <span>电话</span>
          <Input
            type="number"
            v-model="newdata.phone"
            placeholder="请输入电话..."
            @on-blur="chargeNum(newdata.phone, 5, 11, '电话')"
          />
          <span class="warning">电话不能为空！</span>
        </div>
      </div>
      <div slot="toast_bottom">
        <Button class="r" @click="closeToast">关闭</Button>
        <Button class="r" type="success" @click="submit">提交</Button>
      </div>
    </toast>
  </div>
</template> 

<script>
import ContentManage from "../../components/common/contentManage/ContentManage";
import Toast from "../../components/common/toast/Toast";

export default {
  name: "Voluteer",
  components: {
    ContentManage,
    Toast,
  },
  data() {
    return {
      cityList: [
        {
          value: "2020级",
          label: "2020级",
        },
        {
          value: "2019级",
          label: "2019级",
        },
        {
          value: "2018级",
          label: "2018级",
        },
        {
          value: "2017级",
          label: "2017级",
        },
        {
          value: "2016级",
          label: "2016级",
        },
        {
          value: "2015级",
          label: "2015级",
        },
      ],
      model: "",
      columns: [
        {
          title: "学号",
          slot: "id",
          sortable: "custom",
        },
        {
          title: "姓名",
          slot: "name",
        },
        {
          title: "性别",
          slot: "sex",
        },
        {
          title: "级别",
          slot: "grade",
        },
        {
          title: "班级",
          slot: "class",
        },
        {
          title: "电话",
          slot: "phone",
        },
        {
          title: "操作",
          slot: "action",
          width: 220,
          align: "center",
        },
      ],
      // 测试数据
      data: [
        {
          id: "201705200101",
          name: "姑父",
          sex: "男",
          date: "2016-10-03",
          grade: "2017级",
          class: "电商一班",
          phone: "15616015756",
        },
        {
          id: "201705200102",
          name: "张三",
          sex: "男",
          date: "2016-10-03",
          grade: "2017级",
          class: "电商一班",
          phone: "15616015756",
        },
        {
          id: "201705200103",
          name: "李四",
          sex: "男",
          date: "2016-10-03",
          grade: "2017级",
          class: "电商一班",
          phone: "15616015756",
        },
        {
          id: "201705200104",
          name: "阿姨",
          sex: "男",
          date: "2016-10-03",
          grade: "2017级",
          class: "电商一班",
          phone: "15616015756",
        },
        {
          id: "201705200105",
          name: "舅舅",
          sex: "男",
          date: "2016-10-03",
          grade: "2017级",
          class: "电商一班",
          phone: "15616015756",
        },
        {
          id: "201705200106",
          name: "姑姑",
          sex: "男",
          date: "2016-10-03",
          grade: "2017级",
          class: "电商一班",
          phone: "15616015756",
        },
        {
          id: "201705200107",
          name: "弟弟",
          sex: "男",
          date: "2016-10-03",
          grade: "2017级",
          class: "电商一班",
          phone: "15616015756",
        },
        {
          id: "201705200108",
          name: "哥哥",
          sex: "男",
          date: "2016-10-03",
          grade: "2017级",
          class: "电商一班",
          phone: "15616015756",
        },
        {
          id: "201705200109",
          name: "妹妹",
          sex: "男",
          date: "2016-10-03",
          grade: "2017级",
          class: "电商一班",
          phone: "15616015756",
        },
        {
          id: "201705200110",
          name: "姐姐",
          sex: "男",
          date: "2016-10-03",
          grade: "2017级",
          class: "电商一班",
          phone: "15616015756",
        },
        {
          id: "201705200111",
          name: "妈妈",
          sex: "男",
          date: "2016-10-03",
          grade: "2017级",
          class: "电商一班",
          phone: "15616015756",
        },
        {
          id: "201705200112",
          name: "爸爸",
          sex: "男",
          date: "2016-10-03",
          grade: "2017级",
          class: "电商一班",
          phone: "15616015756",
        },
        {
          id: "201705200113",
          name: "奶奶",
          sex: "男",
          date: "2016-10-03",
          grade: "2017级",
          class: "电商一班",
          phone: "15616015756",
        },
        {
          id: "201705200114",
          name: "爷爷",
          sex: "男",
          date: "2016-10-03",
          grade: "2017级",
          class: "电商一班",
          phone: "15616015756",
        },
        {
          id: "201705200115",
          name: "叔叔",
          sex: "男",
          date: "2016-10-03",
          grade: "2017级",
          class: "电商一班",
          phone: "15616015756",
        },
      ],
      // 操作的数据存储:与 data 分离避免重构的闪烁
      editIndex: "-1",
      editName: "",
      editId: "",
      editSex: "",
      editGrade: "",
      editClass: "",
      editPhone: "",

      // 实现分页：
      // 初始化信息存储
      ajaxHistoryData: [],
      // 初始化信息总条数
      dataCount: 0,
      // 每页显示条数
      pageSize: 13,
      // 当前页码
      page: 1,
      // 每页显示信息存储
      showData: [],
      isShowToast: false,
      newdata: {
        id: "",
        name: "",
        sex: "男",
        date: "",
        grade: "",
        class: "",
        phone: "",
      },
    };
  },
  created() {
    let compare = function (name) {
      return function (o, p) {
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
          return a < b ? -1 : 1;
        } else {
          throw "error";
        }
      };
    };
    this.data.sort(compare(this.data.id));
    // console.log(this.data);
    this.handleListHistory();
  },
  methods: {
    remove(index) {
      this.showData.splice(index, 1);
      //   console.log(index);
      this.editIndex = -1;
    },
    handleEdit(row, index) {
      this.editIndex = index;
      this.editName = row.name;
      this.editId = row.id;
      this.editSex = row.sex;
      this.editGrade = row.grade;
      this.editClass = row.class;
      this.editPhone = row.phone;
    },
    handleSave(index) {
      this.data[index].id = this.editId;
      this.data[index].name = this.editName;
      this.data[index].sex = this.editSex;
      this.data[index].grade = this.editGrade;
      this.data[index].class = this.editClass;
      this.data[index].phone = this.editPhone;
      this.editIndex = -1;
    },
    //初始化页面， 获取历史记录信息
    handleListHistory() {
      // 保存取到的所有数据
      this.ajaxHistoryData = this.data;
      this.dataCount = this.data.length;
      // console.log(this.data);
      this.refreshShowData();
    },
    changePage(index) {
      console.log(this.ajaxHistoryData);
      this.page = index;
      let _start = (index - 1) * this.pageSize;
      let _end = index * this.pageSize;
      this.showData = this.ajaxHistoryData.slice(_start, _end);
    },
    //按级别显示
    showGrade(value) {
      //从所有数据中筛选级别
      this.ajaxHistoryData = this.data;
      let g = this.ajaxHistoryData.filter((item) => item.grade == value);
      this.ajaxHistoryData = g;
      // console.log(this.ajaxHistoryData);
      this.refreshShowData();
      // console.log(this.ajaxHistoryData);
      this.dataCount = g.length;
    },
    //搜索功能实现
    volSearch(value) {
      //从所有数据中搜索
      this.ajaxHistoryData = this.data;
      let s = this.ajaxHistoryData.filter((item) => item.name == value);
      // console.log(s);
      this.ajaxHistoryData = s;
      this.refreshShowData();
      // console.log(this.ajaxHistoryData);
      this.dataCount = s.length;
    },
    //排序
    sortChanged() {
      // console.log("111");
      function sortId(a, b) {
        return a - b;
      }
      this.ajaxHistoryData = this.ajaxHistoryData.sort(sortId);
      this.showData = this.ajaxHistoryData.reverse();
      // console.log(this.ajaxHistoryData.reverse());
      this.refreshShowData();
    },
    //封装数据分页
    refreshShowData() {
      if (this.ajaxHistoryData.length <= this.pageSize) {
        this.showData = this.ajaxHistoryData;
      } else {
        this.showData = this.ajaxHistoryData.slice(0, this.pageSize);
      }
    },
    // 显示toast
    showToast() {
      this.isShowToast = true;
    },
    // toast关闭
    closeToast() {
      this.isShowToast = false;
    },
    // 封装判断输入的数字是否符合要求函数
    chargeNum(type, index, length, paramType) {
      let flag = true;
      let warning = document.querySelectorAll(".warning");
      if (!type) {
        warning[index].className = "warning warning-show";
        warning[index].innerHTML = paramType + "不能为空！";
        flag = false;
      } else if (type.length != length) {
        warning[index].className = "warning warning-show";
        warning[index].innerHTML = paramType + "必须为" + length + "位！";
        flag = false;
      } else {
        warning[index].className = "warning";
      }
      return flag;
    },
    // 封装判断输入的文字是否符合要求函数
    chargeText(type, index, paramType) {
      let flag = true;
      let warning = document.querySelectorAll(".warning");
      // console.log(warning);
      if (!type) {
        warning[index].className = "warning warning-show";
        warning[index].innerHTML = paramType + "不能为空！";
        flag = false;
      } else {
        warning[index].className = "warning";
      }
      return flag;
    },
    // toast提交
    submit() {
      let flag = true;
      // 判断输入内容是否符合要求
      // 判断学号是否输入正确
      flag = this.chargeNum(this.newdata.id, 0, 12, "学号");
      // 判断姓名name
      flag = this.chargeText(this.newdata.name, 1, "姓名");
      // 判断性别选择
      flag = this.chargeText(this.newdata.sex, 2, "性别");
      // 判断级别输入
      flag = this.chargeText(this.newdata.grade, 3, "级别");
      // 判断班级
      flag = this.chargeText(this.newdata.class, 4, "班级");
      // 判断电话
      flag = this.chargeNum(this.newdata.phone, 5, 11, "电话");
      // 添加新数据
      if (flag) {
        this.data.unshift(this.newdata);
        this.refreshShowData();
        this.$Message.success("添加成功");
        this.isShowToast = false;
      }
    },
    // 输入框失焦时判断数据
  },
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
  display: flex;
  justify-content: space-evenly;
  align-items: space-evenly;
  height: 36px;
  padding-top: 4px;
  width: 500px;
}

/* 面包屑样式 */
.ivu-breadcrumb {
  display: inline;
  line-height: 40px;
}
/* 搜索框样式 */
.ivu-input-wrapper {
  width: 200px !important;
}
.ivu-btn-info {
  position: relative;
  bottom: -1px;
}
/* 修改操作中input框的宽度 */
.content_main .ivu-input {
  width: 50%;
}
.mgleft {
  margin-left: 10px;
}
/* 添加志愿者弹出框样式 */
.toast_content div {
  padding: 5px 0;
}
.toast_content span {
  margin-right: 10px;
}
.toast_content span:nth-child(3) {
  display: none;
  color: #ed4014;
}
/* 输入框宽度设置 */
.toast_content .ivu-input {
  width: 100%;
}
.toast_content .ivu-input-wrapper {
  width: 68% !important;
}
.toast_bottom {
  margin-top: 80px;
}
/* 按钮位置 */
.toast_bottom .r {
  margin-right: 20px;
}
.warning-show {
  display: inline !important;
}
</style>