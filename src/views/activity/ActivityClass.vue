<template>
  <div id="content" class="l">
    <content-manage name="activityMessage">
      <div class="top">
        <Breadcrumb class="mgleft">
          <BreadcrumbItem>活动管理</BreadcrumbItem>
          <BreadcrumbItem to="/volunteerMessage">活动信息</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div class="acitivityClass-list">
        <List v-for="(item, index) in activityClassData" :key="index">
          <ListItem>
            <ListItemMeta :title="item.name" :description="item.content" />
            <template slot="action">
              <li>
                <a href="javascript:;" @click="edit(index)">编辑</a>
              </li>
            </template>
          </ListItem>
        </List>
        <Modal
          v-model="modal"
          title="编辑活动"
          @on-ok="handleSubmit('formValidate')"
          @on-cancel="handleCancel"
        >
          <Form
            ref="formValidate"
            :model="formValidate"
            :rules="ruleValidate"
            :label-width="80"
          >
            <FormItem label="活动名称" prop="name">
              <Input
                v-model="formValidate.name"
                placeholder="输入活动名称"
              ></Input>
            </FormItem>
            <FormItem label="活动介绍" prop="content">
              <Input
                v-model="formValidate.content"
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 5 }"
                placeholder="输入活动介绍"
              ></Input>
            </FormItem>
          </Form>
        </Modal>
      </div>
    </content-manage>
  </div>
</template>

<script>
import ContentManage from "../../components/common/contentManage/ContentManage";

export default {
  name: "ActivityClass",
  components: {
    ContentManage,
  },
  data() {
    return {
      modal: false,
      activityClassData: [
        {
          name: "科技馆活动1",
          content:
            "技术馆的主要教育形式为展览教育,通过科学性、知识性、趣味性相结合的展览内容和参与互动的形式,不仅普及科学知识,而且注重培养观众的科学思想。",
        },
        {
          name: "科技馆活动2",
          content:
            "技术馆的主要教育形式为展览教育,通过科学性、知识性、趣味性相结合的展览内容和参与互动的形式,不仅普及科学知识,而且注重培养观众的科学思想。",
        },
        {
          name: "科技馆活动3",
          content:
            "技术馆的主要教育形式为展览教育,通过科学性、知识性、趣味性相结合的展览内容和参与互动的形式,不仅普及科学知识,而且注重培养观众的科学思想。",
        },
        {
          name: "科技馆活动4",
          content:
            "技术馆的主要教育形式为展览教育,通过科学性、知识性、趣味性相结合的展览内容和参与互动的形式,不仅普及科学知识,而且注重培养观众的科学思想。",
        },
        {
          name: "科技馆活动5",
          content:
            "技术馆的主要教育形式为展览教育,通过科学性、知识性、趣味性相结合的展览内容和参与互动的形式,不仅普及科学知识,而且注重培养观众的科学思想。",
        },
      ],
      formValidate: {
        name: "",
        content: "",
      },
      ruleValidate: {
        name: [
          {
            required: true,
            message: "The name cannot be empty",
            trigger: "blur",
          },
        ],
        desc: [
          {
            required: true,
            message: "Please enter a personal introduction",
            trigger: "blur",
          },
          {
            type: "string",
            min: 20,
            message: "Introduce no less than 20 words",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success("修改成功!");
        } else {
          this.$Message.error("修改失败!");
        }
      });
    },
    handleCancel(name) {
      this.$Message.info("取消修改!");
    },
    edit(index) {
      this.formValidate = this.activityClassData[index];
      this.modal = true;
    },
  },
};
</script>

<style scoped>
.acitivityClass-list {
  background-color: #fff;
  padding: 10px;
  margin: 10px;
}
.top {
  background-color: #f5f7f9;
}
</style>