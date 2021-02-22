<template>
  <div id="content" class="l">
    <content-manage name="departmentClass">
      <div class="content_top">
        <Breadcrumb class="mgleft">
          <BreadcrumbItem>部门管理</BreadcrumbItem>
          <BreadcrumbItem to="/volunteerMessage">部门分类</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div class="content_main">
        <Table
          border
          ref="selection"
          :columns="columns4"
          :data="data1"
          @on-selection-change="selectChange"
        ></Table>
        <Button @click="handleSelectAll(true)" style="margin-top: 20px"
          >全选</Button
        >
        <Button @click="handleSelectAll(false)" style="margin-top: 20px"
          >取消全选</Button
        >
        <Button
          @click="removeDepartment()"
          type="error"
          style="margin-top: 20px"
          >删除选中部门</Button
        >
      </div>
    </content-manage>
    <result ref="result" :message="'message'"></result>
  </div>
</template>

<script>
import ContentManage from "../../components/common/contentManage/ContentManage";
import Result from "../../components/common/result/Result";

export default {
  name: "DepartmentClass",
  components: {
    ContentManage,
    Result,
  },
  
    data() {
    return {
      columns4: [
        {
          type: "selection",
          width: 60,
          align: "center",
        },
        {
          title: "部门名称",
          key: "name",
        },
        {
          title: "部门人数",
          key: "number",
        },
        {
          title: "现任部长/队长(附联系方式)",
          key: "header",
        },
      ],
      data1: [
        {
          name: "办公室",
          number: 18,
          header: "兰萱(15616015756)",
        },
        {
          name: "策划部",
          number: 24,
          header: "喻兰(18816664134)",
        },
        {
          name: "人事交流部",
          number: 30,
          header: "王烨(15815541234)",
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
      message: '删除选中部门成功'
    };
  },
  methods: {
    handleSelectAll(status) {
      this.$refs.selection.selectAll(status);
    },
    removeDepartment() {
      if (this.selection.length <= 0) {
          this.message = "请选择部门!";
          this.$refs.result.resultShow(this.message, 3000);
          this.message = "删除选中部门成功!";
          return ;
      }
      this.selection.forEach((item) => {
        let name = item.name;
        let idx = this.data1.findIndex((item) => item.name == name);
        this.data1.splice(idx, 1);
        this.showToast('操作成功');
        this.selection = [];
      });
    },
    selectChange(selection) {
      this.selection = selection;
    },
    showToast() {
        // 调用result弹出框中的方法
        this.$refs.result.resultShow(this.message, 3000);
    }
  },
};
</script>

<style>
.content_top {
  height: 40px;
  background-color: #f0f2f5;
}
.mgleft {
  margin-left: 10px;
}
</style>