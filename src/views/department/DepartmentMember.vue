<template>
  <div id="content" class="l">
    <content-manage name="volunteerMessage">
      <div class="content_top">
        <div class="top_left">
          <Breadcrumb class="mgleft">
            <BreadcrumbItem>部门管理</BreadcrumbItem>
            <BreadcrumbItem to="/volunteerMessage">部门成员</BreadcrumbItem>
          </Breadcrumb>
        </div>
        <div class="top_right">
          <Select
            style="width: 100px"
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
          style="position: absolute; right: 82px; bottom: 10px"
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
        <Form
          ref="formValidate"
          :model="formValidate"
          :rules="ruleValidate"
          :label-width="80"
        >
          <FormItem label="姓名" prop="name">
            <Input
              v-model="formValidate.name"
              placeholder="请输入你的姓名"
            ></Input>
          </FormItem>
          <FormItem label="性别" prop="sex">
            <RadioGroup v-model="formValidate.sex">
              <Radio label="男">男</Radio>
              <Radio label="女">女</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="部门" prop="department">
            <Input
              v-model="formValidate.department"
              placeholder="请输入你的部门"
            ></Input>
          </FormItem>
          <FormItem label="职位" prop="position">
            <Input
              v-model="formValidate.position"
              placeholder="请输入你的职位"
            ></Input>
          </FormItem>
          <FormItem label="电话" prop="phone">
            <Input
              v-model="formValidate.phone"
              placeholder="请输入你的电话"
            ></Input>
          </FormItem>
        </Form>
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
      formValidate: {
        name: "",
        sex: "",
        department: "",
        position: "",
        phone: "",
      },
      ruleValidate: {
        name: [
          {
            required: true,
            message: "姓名不能为空",
            trigger: "blur",
          },
        ],
        sex: [
          {
            required: true,
            message: "请选择性别",
            trigger: "change",
          },
        ],
        department: [
          {
            required: true,
            message: "部门不能为空",
            trigger: "blur",
          },
          {
            type: "string",
            message: "部门不能为空",
            trigger: "blur",
          },
        ],
        position: [
          {
            required: true,
            message: "职位不能为空",
            trigger: "blur",
          },
          {
            type: "string",
            message: "职位不能为空",
            trigger: "blur",
          },
        ],
        phone: [
          {
            required: true,
            message: "电话不能为空",
            trigger: "blur",
          },
          {
            type: "string",
            min: 11,
            max: 11,
            message: "电话必须是11位",
            trigger: "blur",
          },
        ],
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
    //初始化页面， 获取历史记录信息
    handleListHistory() {
      // 保存取到的所有数据
      this.ajaxHistoryData = this.data;
      this.dataCount = this.data.length;
      // console.log(this.data);
      this.refreshShowData();
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
    remove(index) {
      // 确认删除弹出框
      this.$Modal.confirm({
        title: "确认删除吗？",
        onOk: () => {
          // 删除当前保存的获取到的ajax数据
          this.ajaxHistoryData.splice(index, 1);
          //   console.log(index);
          // 关闭输入框
          this.editIndex = -1;
          // 修改删除数据后的数据总数
          this.dataCount = this.ajaxHistoryData.length;
          // 重新渲染当前页
          this.refreshShowData();
          this.$Message.info("删除成功");
        },
        onCancel: () => {
          // 关闭输入框
          this.editIndex = -1;
          this.$Message.info("取消删除");
        },
      });
    },
    // 监听页码发生改变， 并模拟异步
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
      }, 1000);
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
    //封装数据分页
    refreshShowData() {
      if (this.ajaxHistoryData.length <= this.pageSize) {
        this.showData = this.ajaxHistoryData;
      } else {
        this.showData = this.ajaxHistoryData.slice(
          (this.page - 1) * this.pageSize,
          this.page * this.pageSize
        );
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
    // toast提交
    submit() {
      this.data.unshift(this.formValidate);
      this.refreshShowData();
      this.$Message.success("添加志愿者成功");
      this.isShowToast = false;
    },
  },
};
</script>

<style scoped>
.content_top {
  display: flex;
  justify-content: space-between;
  height: 40px;
  background-color: #f5f7f9;
}
.content_top .top_left {
  line-height: 40px;
}
.content_top .top_right {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding-top: 4px;
  width: 500px;
}
.ivu-breadcrumb {
  display: inline;
}
/* 搜索框样式 */
.ivu-input-wrapper {
  width: 200px !important;
  transform: translateY(-1px);
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
/* 添加部门成员弹出框样式 */
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
.ivu-form-item {
  margin-bottom: 10px;
}
</style>