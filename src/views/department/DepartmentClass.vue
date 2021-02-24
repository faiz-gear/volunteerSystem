<template>
  <div id="content" class="l">
    <content-manage name="departmentClass">
      <div class="content_top">
        <Breadcrumb class="mgleft">
          <BreadcrumbItem>部门管理</BreadcrumbItem>
          <BreadcrumbItem to="/departmentClass">部门分类</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div class="content_main">
        <Table
          border
          ref="selection"
          :columns="columns"
          :data="data"
          @on-selection-change="selectChange"
        >
          <template slot-scope="{ row, index }" slot="name">
            <Input type="text" v-model="editName" v-if="editIndex === index" />
            <span v-else>{{ row.name }}</span>
          </template>

          <template slot-scope="{ row, index }" slot="number">
            <Input
              type="text"
              v-model="editNumber"
              v-if="editIndex === index"
            />
            <span v-else>{{ row.number }}</span>
          </template>

          <template slot-scope="{ row, index }" slot="header">
            <Input
              type="text"
              v-model="editHeader"
              v-if="editIndex === index"
            />
            <span v-else>{{ row.header }}</span>
          </template>

          <template slot-scope="{ row, index }" slot="action">
            <div v-if="editIndex === index">
              <Button @click="handleSave(index)">保存</Button>
              <Button @click="editIndex = -1">取消</Button>
            </div>
            <div v-else>
              <Button @click="handleEdit(row, index)">操作</Button>
            </div>
          </template>
        </Table>
        <Button @click="handleSelectAll(true)" style="margin-top: 20px"
          >全选</Button
        >
        <Button @click="handleSelectAll(false)" style="margin-top: 20px"
          >取消全选</Button
        >
        <Button @click="removeDepartment" type="error" style="margin-top: 20px"
          >删除选中部门</Button
        >
        <Button type="primary" style="margin-top: 20px" @click="addDepartment"
          >添加部门</Button
        >
      </div>
    </content-manage>
    <result ref="result" :message="'message'"></result>
    <toast
      :showToast="isShowToast"
      @closeToast="closeToast"
      :title="'添加部门'"
      @submit="submit"
    >
      <div slot="toast_content" class="departmentToast">
        <div>
          <span>部门名称</span>
          <Input
            v-model="name"
            placeholder="请输入部门名称"
            clearable
            style="width: 68%"
          />
        </div>
        <div>
          <span>部门人数</span>
          <Input
            v-model="number"
            placeholder="请输入部门人数"
            clearable
            style="width: 68%"
          />
        </div>
        <div>
          <span>现任部长/队长</span>
          <Input
            v-model="header"
            placeholder="请输入现任部长/队长"
            clearable
            style="width: 68%"
          />
        </div>
      </div>
    </toast>
  </div>
</template>

<script>
import ContentManage from "../../components/common/contentManage/ContentManage";
import Result from "../../components/common/result/Result";
import Toast from "../../components/common/toast/Toast";

export default {
  name: "DepartmentClass",
  components: {
    ContentManage,
    Result,
    Toast,
  },

  data() {
    return {
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center",
        },
        {
          title: "部门名称",
          slot: "name",
        },
        {
          title: "部门人数",
          slot: "number",
        },
        {
          title: "现任部长/队长",
          slot: "header",
        },
        {
          title: "操作",
          slot: "action",
        },
      ],
      data: [
        {
          name: "办公室",
          number: 18,
          header: "兰萱",
        },
        {
          name: "策划部",
          number: 24,
          header: "喻兰",
        },
        {
          name: "人事交流部",
          number: 30,
          header: "王烨",
        },
        {
          name: "传媒部",
          number: 26,
          header: "文若冰",
        },
        {
          name: "社会实践部",
          number: 32,
          header: "彭禹琪",
        },
        {
          name: "文工团",
          number: 22,
          header: "杨嘉滢",
        },
        {
          name: "志愿者管理部",
          number: 21,
          header: "郭瑞",
        },
        {
          name: "外联部",
          number: 28,
          header: "康松明",
        },
        {
          name: "志愿服务队",
          number: 33,
          header: "洪欣",
        },
      ],
      // 已选择的部门
      selection: [],
      message: "删除选中部门成功",
      editIndex: -1, // 当前聚焦的输入框的行数
      editName: "", // 第一列输入框，当然聚焦的输入框的输入内容，与 data 分离避免重构的闪烁
      editNumber: "", // 第二列输入框
      editHeader: "", // 第三列输入框,
      isShowToast: false,
      name: "",
      number: "",
      header: "",
    };
  },
  methods: {
    // 全选
    handleSelectAll(status) {
      this.$refs.selection.selectAll(status);
    },
    // 删除部门
    removeDepartment() {
      if (this.selection.length <= 0) {
        this.message = "请选择部门!";
        this.$refs.result.resultShow(this.message, 3000);
        this.message = "删除选中部门成功!";
        return;
      }
      // 确认删除模态框
      this.$Modal.confirm({
        title: "确认删除所选部门吗？",
        onOk: () => {
          this.selection.forEach((item) => {
            let name = item.name;
            let idx = this.data.findIndex((item) => item.name == name);
            this.data.splice(idx, 1);
            this.showResult("操作成功");
            this.selection = [];
          });
        },
        onCancel: () => {
          this.message = "删除取消";
          this.$refs.result.resultShow(this.message, 3000);
          this.message = "删除选中部门成功!";
        },
      });
    },
    // 监听选择项状态改变，获取选择项
    selectChange(selection) {
      this.selection = selection;
    },
    // 显示
    showResult() {
      // 调用result弹出框中的方法
      this.$refs.result.resultShow(this.message, 3000);
    },
    // 点击操作按钮
    handleEdit(row, index) {
      this.editName = row.name;
      this.editNumber = row.number;
      this.editAddress = row.address;
      this.editHeader = row.header;
      this.editIndex = index;
    },
    // 点击保存按钮
    handleSave(index) {
      this.data[index].name = this.editName;
      this.data[index].number = this.editNumber;
      this.data[index].header = this.editHeader;
      this.data[index].address = this.editAddress;
      this.editIndex = -1;
    },
    addDepartment() {
      this.isShowToast = true;
    },
    // 关闭toast
    closeToast() {
      this.isShowToast = false;
    },
    submit() {
      if (!this.name) {
        console.log(1);
        return this.$Message.info("部门名称不能为空");
      }
      if (!this.number) {
        return this.$Message.info("部门人数不能为空");
      }
      if (!this.header) {
        return this.$Message.info("现任部长/队长不能为空");
      }
      this.data.push({
        name: this.name,
        number: this.number,
        header: this.header,
      });
      this.$Message.success("添加部门成功");
      this.isShowToast = false;
    },
  },
};
</script>

<style scoped>
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
.mgleft {
  margin-left: 10px;
}
.departmentToast span {
  margin-right: 10px;
}
.departmentToast div:nth-child(-n + 2) span {
  margin-right: 37px;
}
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
</style>