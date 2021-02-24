<template>
  <div id="content" class="l">
    <content-manage name="volunteerMessage">
      <div class="content_top">
        <Breadcrumb class="mgleft">
          <BreadcrumbItem>部门管理</BreadcrumbItem>
          <BreadcrumbItem to="/volunteerMessage">部门成员</BreadcrumbItem>
        </Breadcrumb>
        <div class="top_right r clear">
          <Select
            style="width: 100px"
            class="bianju"
            placeholder="部门"
            @on-change="showDepartment"
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
            >添加部门成员</Button
          >
        </div>
      </div>
      <div class="content_main">
        <Table :columns="columns" :data="showData" :loading="loading">
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
          <template slot-scope="{ row, index }" slot="department">
            <Input
              type="text"
              v-model="editDepartment"
              v-if="editIndex === index"
              width="50%"
            />
            <span v-else>{{ row.department }}</span>
          </template>
          <template slot-scope="{ row, index }" slot="position">
            <Input
              type="text"
              v-model="editPosition"
              v-if="editIndex === index"
              width="50%"
            />
            <span v-else>{{ row.position }}</span>
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
    <toast
      v-show="isShowToast"
      @click="showToast"
      :showToast="isShowToast"
      @submit="submit"
      @closeToast="closeToast"
    >
      <div slot="toast_content" class="departmentToast">
        <div>
          <span>姓名</span>
          <Input
            clearable
            v-model="newdata.name"
            placeholder="请输入姓名..."
            @on-blur="chargeText(newdata.name, 0, '姓名')"
          />
          <span class="warning">姓名不能为空！</span>
        </div>
        <div>
          <span>性别</span>
          <RadioGroup v-model="newdata.sex" value="男">
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
          <span>部门</span>
          <Input
            clearable
            v-model="newdata.department"
            placeholder="请输入部门..."
            @on-blur="chargeText(newdata.department, 2, '部门')"
          />
          <span class="warning">部门不能为空！</span>
        </div>
        <div>
          <span>职位</span>
          <Input
            clearable
            v-model="newdata.position"
            placeholder="请输入职位..."
            @on-blur="chargeText(newdata.position, 3, '职位')"
          />
          <span class="warning">职位不能为空！</span>
        </div>
        <div>
          <span>电话</span>
          <Input
            type="number"
            v-model="newdata.phone"
            placeholder="请输入电话..."
            @on-blur="chargeNum(newdata.phone, 4, 11, '电话')"
          />
          <span class="warning">电话不能为空！</span>
        </div>
      </div>
    </toast>
  </div>
</template>

<script>
import ContentManage from "../../components/common/contentManage/ContentManage";
import Toast from "../../components/common/toast/Toast";

export default {
  name: "DepartmentMember",
  components: {
    ContentManage,
    Toast,
  },
  data() {
    return {
      cityList: [
        {
          value: "办公室",
          label: "办公室",
        },
        {
          value: "策划部",
          label: "策划部",
        },
        {
          value: "人事交流部",
          label: "人事交流部",
        },
        {
          value: "传媒部",
          label: "传媒部",
        },
        {
          value: "社会实践部",
          label: "社会实践部",
        },
        {
          value: "文工团",
          label: "文工团",
        },
        {
          value: "志愿者管理部",
          label: "志愿者管理部",
        },
        {
          value: "外联部",
          label: "外联部",
        },
        {
          value: "志愿服务队",
          label: "志愿服务队",
        },
      ],
      model: "",
      columns: [
        {
          title: "姓名",
          slot: "name",
        },
        {
          title: "性别",
          slot: "sex",
        },
        {
          title: "部门",
          slot: "department",
        },
        {
          title: "职位",
          slot: "position",
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
          name: "兰萱",
          sex: "女",
          department: "办公室",
          position: "部长",
          phone: "15616015756",
        },
        {
          name: "郭瑞",
          sex: "男",
          department: "志愿者管理部",
          position: "部长",
          phone: "18873065528",
        },
        {
          name: "康松明",
          sex: "男",
          department: "外联部",
          position: "部长",
          phone: "13237418894",
        },
        {
          name: "彭禹琪",
          sex: "女",
          department: "社会实践部",
          position: "副部长",
          phone: "13272037078",
        },
      ],
      // 操作的数据存储:与 data 分离避免重构的闪烁
      editIndex: "-1",
      editName: "",
      editId: "",
      editSex: "",
      editDepartment: "",
      editPosition: "",
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
        department: "",
        position: "",
        phone: "",
      },
      // 加载中状态
      loading: false,
      // 加载中状态防抖timer
      timer: null,
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
      this.editDepartment = row.department;
      this.editPosition = row.position;
      this.editPhone = row.phone;
    },
    handleSave(index) {
      this.data[index].id = this.editId;
      this.data[index].name = this.editName;
      this.data[index].sex = this.editSex;
      this.data[index].department = this.editDepartment;
      this.data[index].position = this.editPosition;
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
      clearTimeout(this.timer);
      this.page = index;
      let _start = (index - 1) * this.pageSize;
      let _end = index * this.pageSize;
      this.showData = this.ajaxHistoryData.slice(_start, _end);
      this.loading = true;
      this.debounce();
    },
    // 加载中防抖
    debounce() {
      this.timer = setTimeout(() => {
        this.loading = false;
      }, 2000);
    },
    //按级别显示
    showDepartment(value) {
      //从所有数据中筛选级别
      this.ajaxHistoryData = this.data;
      let g = this.ajaxHistoryData.filter((item) => item.department == value);
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
      // 判断姓名name
      flag = this.chargeText(this.newdata.name, 0, "姓名");
      // 判断性别选择
      // 判断级别输入
      flag = this.chargeText(this.newdata.department, 2, "部门");
      // 判断班级
      flag = this.chargeText(this.newdata.position, 3, "职位");
      // 判断电话
      flag = this.chargeNum(this.newdata.phone, 4, 11, "电话");
      // 添加新数据
      if (flag) {
        this.data.unshift(this.newdata);
        this.refreshShowData();
        this.$Message.success("添加部门成员成功");
        this.isShowToast = false;
      }
    },
    // 输入框失焦时判断数据
  },
};
</script>

<style scoped>
.bianju {
  margin-right: 10px;
}
.content_top {
  height: 40px;
  background-color: #f5f7f9;
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
.departmentToast div {
  padding: 5px 0;
}
.departmentToast span {
  margin-right: 10px;
}
.departmentToast span:nth-child(3) {
  display: none;
  color: #ed4014;
}
/* 输入框宽度设置 */
.departmentToast .ivu-input {
  width: 100%;
}
.departmentToast .ivu-input-wrapper {
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