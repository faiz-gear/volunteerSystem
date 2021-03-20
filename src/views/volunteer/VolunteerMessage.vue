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
        <Table :columns="columns" :data="data" :loading="loading">
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
          :current="page"
        ></page>
      </div>
    </content-manage>
    <toast
      v-show="isShowToast"
      @click="showToast"
      :showToast="isShowToast"
      @submit="submit('formValidate')"
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

import {
  getVolunteerMsg,
  addVolunteer,
  updateVolunteer,
  deleteVolunteer,
} from "../../network/volunteer";

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
          value: "所有级别",
          label: "所有级别",
        },
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
      // 请求获取的数据
      data: [],
      // 操作的数据存储:与 data 分离避免重构的闪烁
      editIndex: "-1",
      editName: "",
      editStudyNumber: "",
      editSex: "",
      editGrade: "",
      editClass: "",
      editPhone: "",
      editId: "",
      // 存储修改后的数据
      updateData: {},

      // 初始化信息总条数
      dataCount: 0,
      // 每页显示条数
      pageSize: 8,
      // 当前页码
      page: 1,
      // 当前级别
      grade: "",
      // 搜索的姓名
      name: "",
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
            message: "学号不能为空",
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
    this.getList(this.page, this.pageSize);
  },
  methods: {
    // 发请求分页获取数据
    getList(pageno, pagesize, grade, name) {
      this.loading = true;
      getVolunteerMsg(pageno, pagesize, grade, name).then((res) => {
        if (res.status !== 0) return this.$Message.error(res.message)
        this.data = res.data;
        this.dataCount = res.page.total;
        this.loading = false;
      });
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
      this.editId = this.data.find(
        (item) => item.studyNumber == row.studyNumber
      ).id;
    },
    // 点击保存按钮
    handleSave() {
      this.updateData = {
        studyNumber: this.editStudyNumber,
        name: this.editName,
        sex: this.editSex,
        grade: this.editGrade,
        class: this.editClass,
        phone: this.editPhone,
        id: this.editId,
      };
      updateVolunteer(this.updateData).then((res) => {
        if (res.status !== 0) return this.$Message.error(res.message);
        this.$Message.success("保存成功！");
        this.getList(this.page, this.pageSize);
        // 去掉编辑输入框
        this.editIndex = -1;
      });
    },
    remove() {
      // 确认删除弹出框
      this.$Modal.confirm({
        title: "确认删除吗？",
        onOk: () => {
          deleteVolunteer(this.editId).then((res) => {
            if (res.status !== 0) return this.$Message.error(res.message);
            // 删除成功
            this.editIndex = -1;
            this.$Message.info("删除成功");
            this.page = 1;
            this.getList(this.page, this.pageSize)
          });
        },
        onCancel: () => {
          // 关闭输入框
          this.editIndex = -1;
          this.$Message.info("取消删除");
        },
      });
    },
    // 监听页码发生改变
    changePage(index) {
      // console.log(this.ajaxHistoryData);
      clearTimeout(this.timer);
      this.page = index;
      this.debounce(this.page, this.pageSize, this.grade, this.name);
    },
    // 切换分页防抖
    debounce(pageno, pagesize, grade, name) {
      this.timer = setTimeout(() => {
        this.getList(pageno, pagesize, grade, name);
      }, 160);
    },
    //按级别显示
    showGrade(value) {
      this.grade = value;
      this.page = 1;
      this.getList(this.page, this.pageSize, this.grade, this.name);
    },
    //搜索功能实现
    volSearch(value) {
      this.name = value;
      this.page = 1;
      this.getList(this.page, this.pageSize, this.grade, this.name);
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
    submit(formValidate) {
      this.$refs[formValidate].validate((valid) => {
        if (valid) {
          addVolunteer(this.formValidate).then((res) => {
            if (res.status !== 0) return this.$Message.error(res.message);
            this.$Message.success("添加志愿者成功");
            this.isShowToast = false;
            this.getList(this.page, this.pageSize);
          });
        } else {
          this.$Message["warning"]({
            background: true,
            content: "必填项不能为空！",
          });
        }
      });
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
  width: 150px !important;
  transform: translateY(-1px);
}
/* 修改操作中input框的宽度 */
.content_main .ivu-input {
  width: 50%;
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
  margin-bottom: 5px;
}
</style>