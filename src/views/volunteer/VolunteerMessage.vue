<template>
  <div id="content" class="l">
    <content-manage name="volunteerMessage">
      <div class="content_top">
        <div class="top_left">
          <Breadcrumb class="mgleft">
            <BreadcrumbItem>志愿者管理</BreadcrumbItem>
            <BreadcrumbItem to="/volunteerMessage">志愿者信息</BreadcrumbItem>
          </Breadcrumb>
        </div>
        <div class="top_right">
          <Select
            v-model="model"
            style="width: 100px"
            placeholder="级别"
            @on-change="showGrade"
          >
            <Option
              v-for="item in gradeList"
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
            >添加志愿者</Button
          >
        </div>
      </div>
      <div class="content_main">
        <Table
          :columns="columns"
          :data="showData"
          :loading="loading"
          @on-sort-change="sortChanged"
        >
          <template slot-scope="{ row, index }" slot="studyNumber">
            <Input
              type="text"
              v-model="editStudyNumber"
              v-if="editIndex === index"
              width="50%"
            />
            <span v-else>{{ row.studyNumber }}</span>
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
      <div slot="toast_content" class="volunteerToast">
        <Form
          ref="formValidate"
          :model="formValidate"
          :rules="ruleValidate"
          :label-width="80"
        >
          <FormItem label="学号" prop="studyNumber">
            <Input
              v-model="formValidate.studyNumber"
              placeholder="请输入你的学号"
              type="number"
            ></Input>
          </FormItem>
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
          <FormItem label="级别" prop="grade">
            <Select
              style="width: 68%"
              v-model="formValidate.grade"
              placeholder="请选择你的级别"
            >
              <Option value="2020级">2020级</Option>
              <Option value="2019级">2019级</Option>
              <Option value="2018级">2018级</Option>
              <Option value="2017级">2017级</Option>
            </Select>
          </FormItem>
          <FormItem label="班级" prop="class">
            <Input
              v-model="formValidate.class"
              placeholder="请输入你的班级"
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
  name: "Voluteer",
  components: {
    ContentManage,
    Toast,
  },
  data() {
    return {
      gradeList: [
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
          slot: "studyNumber",
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
          studyNumber: "201705200101",
          name: "姑父",
          sex: "男",
          grade: "2017级",
          class: "电商一班",
          phone: "15616015756",
        },
        {
          studyNumber: "201705200102",
          name: "张三",
          sex: "男",
          grade: "2017级",
          class: "电商一班",
          phone: "15616015756",
        },
        {
          studyNumber: "201705200103",
          name: "李四",
          sex: "男",
          grade: "2017级",
          class: "电商一班",
          phone: "15616015756",
        },
        {
          studyNumber: "201705200104",
          name: "阿姨",
          sex: "男",
          grade: "2017级",
          class: "电商一班",
          phone: "15616015756",
        },
        {
          studyNumber: "201705200105",
          name: "舅舅",
          sex: "男",
          grade: "2017级",
          class: "电商一班",
          phone: "15616015756",
        },
        {
          studyNumber: "201705200106",
          name: "姑姑",
          sex: "男",
          grade: "2017级",
          class: "电商一班",
          phone: "15616015756",
        },
        {
          studyNumber: "201705200107",
          name: "弟弟",
          sex: "男",
          grade: "2017级",
          class: "电商一班",
          phone: "15616015756",
        },
        {
          studyNumber: "201705200108",
          name: "哥哥",
          sex: "男",
          grade: "2017级",
          class: "电商一班",
          phone: "15616015756",
        },
        {
          studyNumber: "201705200109",
          name: "妹妹",
          sex: "男",
          grade: "2017级",
          class: "电商一班",
          phone: "15616015756",
        },
        {
          studyNumber: "201705200110",
          name: "姐姐",
          sex: "男",
          grade: "2017级",
          class: "电商一班",
          phone: "15616015756",
        },
        {
          studyNumber: "201705200111",
          name: "妈妈",
          sex: "男",
          grade: "2017级",
          class: "电商一班",
          phone: "15616015756",
        },
        {
          studyNumber: "201705200112",
          name: "爸爸",
          sex: "男",
          grade: "2017级",
          class: "电商一班",
          phone: "15616015756",
        },
        {
          studyNumber: "201705200113",
          name: "奶奶",
          sex: "男",
          grade: "2017级",
          class: "电商一班",
          phone: "15616015756",
        },
        {
          studyNumber: "201705200114",
          name: "爷爷",
          sex: "男",
          grade: "2017级",
          class: "电商一班",
          phone: "15616015756",
        },
        {
          studyNumber: "201705200115",
          name: "叔叔",
          sex: "男",
          grade: "2017级",
          class: "电商一班",
          phone: "15616015756",
        },
      ],
      // 操作的数据存储:与 data 分离避免重构的闪烁
      editIndex: "-1",
      editName: "",
      editStudyNumber: "",
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
      pageSize: 12,
      // 当前页码
      page: 1,
      // 每页显示信息存储
      showData: [],
      isShowToast: false,
      // 加载中状态
      loading: false,
      // 加载中状态防抖timer
      timer: null,
      formValidate: {
        studyNumber: "",
        name: "",
        sex: "",
        grade: "",
        class: "",
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
        studyNumber: [
          {
            required: true,
            message: "id不能为空",
            trigger: "blur",
          },
          {
            type: "string",
            min: 12,
            max: 12,
            message: "学号必须是12位",
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
        grade: [
          {
            required: true,
            message: "级别不能为空",
            trigger: "blur",
          },
        ],
        class: [
          {
            required: true,
            message: "班级不能为空",
            trigger: "blur",
          },
          {
            type: "string",
            message: "班级不能为空",
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
    };
  },
  created() {
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
    // 点击操作按钮
    handleEdit(row, index) {
      this.editIndex = index;
      this.editName = row.name;
      this.editStudyNumber = row.studyNumber;
      this.editSex = row.sex;
      this.editGrade = row.grade;
      this.editClass = row.class;
      this.editPhone = row.phone;
    },
    // 点击保存按钮
    handleSave(index) {
      this.data[index].studyNumber = this.editStudyNumber;
      this.data[index].name = this.editName;
      this.data[index].sex = this.editSex;
      this.data[index].grade = this.editGrade;
      this.data[index].class = this.editClass;
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
      // console.log(this.ajaxHistoryData);
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
      if (
        this.formValidate.studyNumber &&
        this.formValidate.name &&
        this.formValidate.sex &&
        this.formValidate.grade &&
        this.formValidate.class &&
        this.formValidate.phone
      ) {
        this.data.unshift(this.formValidate);
        this.refreshShowData();
        this.$Message.success("添加志愿者成功");
        this.isShowToast = false;
      } else {
        this.$Message["warning"]({
          background: true,
          content: "必填项不能为空！",
        });
      }
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
/* 修改操作中input框的宽度 */
.content_main .ivu-input {
  width: 50%;
}
.mgleft {
  margin-left: 10px;
}
/* 添加志愿者弹出框样式 */
.volunteerToast div {
  padding: 5px 0;
}
.volunteerToast span {
  margin-right: 10px;
}
.volunteerToast span:nth-child(3) {
  display: none;
  color: #ed4014;
}
/* 输入框宽度设置 */
.volunteerToast .ivu-input {
  width: 100%;
}
.volunteerToast .ivu-input-wrapper {
  width: 68% !important;
}
.ivu-form-item {
  margin-bottom: 10px;
}
</style>