<template>
  <div id="content" class="l">
    <content-manage name="filePlan">
      <div class="content_top">
        <Breadcrumb class="mgleft">
          <BreadcrumbItem>文件管理</BreadcrumbItem>
          <BreadcrumbItem to="/filePlan">活动策划文件</BreadcrumbItem>
        </Breadcrumb>
        <Input
          search
          placeholder="输入文件名"
          style="wdith: 200px; float: right; margin-right: 10px"
          @on-search="fileSearch"
          v-model="search"
        />
      </div>
      <div class="content_main">
        <div class="table">
          <Table border :columns="columns4" :data="data" :loading="loading">
            <template slot-scope="{ row, index }" slot="action">
              <Button
                type="primary"
                size="small"
                style="margin-right: 5px"
                @click="downloadFile(index)"
                >下载</Button
              >
              <Button type="error" size="small" @click="removeFile(index)"
                >删除</Button
              >
            </template>
          </Table>
        </div>
        <div class="bottom">
          <div>
            <Upload
              action="http://127.0.0.1/addfileplan"
              style="display: inline-block"
              :format="['doc', 'docx']"
              :show-upload-list="false"
              :before-upload="beforeUpload"
              name="address"
            >
              <Button icon="ios-cloud-upload-outline" type="success"
                >文件上传</Button
              >
            </Upload>
            <div v-if="file !== null" style="display: inline-block">
              您选择的文件是: {{ file.name }}
              <Icon
                type="ios-trash"
                @click.native="handleRemove()"
                style="fontsize: 18px; cursor: pointer"
              ></Icon>
              <Button type="dashed" @click="upload" :loading="loadingStatus">{{
                loadingStatus ? "上传中" : "确认上传"
              }}</Button>
            </div>
          </div>
          <Page
            :total="dataCount"
            :page-size="pageSize"
            show-elevator
            @on-change="changePage"
          />
        </div>
      </div>
    </content-manage>
  </div>
</template>

<script>
import ContentManage from "../../components/common/contentManage/ContentManage";

import { addFilePlan, getFilePlan, downloadFilePlan, removeFilePlan } from "../../network/file";

export default {
  name: "FilePlan",
  components: {
    ContentManage,
  },
  data() {
    return {
      columns4: [
        {
          title: "文件名称",
          key: "name",
        },
        {
          title: "文件大小",
          key: "size",
        },
        {
          title: "上传时间",
          key: "date",
        },
        {
          title: "操作",
          slot: "action",
          width: 150,
          align: "center",
        },
      ],
      data: [],
      // 实现分页：
      // 初始化信息总条数
      dataCount: 0,
      // 每页显示条数
      pageSize: 8,
      // 当前页码
      page: 1,
      token: localStorage.getItem("token"),
      // 正在上传的文件
      file: null,
      // 是否显示上传中
      loadingStatus: false,
      search: "",
      loading: false,
    };
  },
  created() {
    this.loading = true;
    this.getFileList(this.page, this.pageSize);
  },
  methods: {
    // 获取文件信息列表
    getFileList(pageno, pagesize, search) {
      getFilePlan(pageno, pagesize, search).then((res) => {
        console.log(res);
        if (res.status !== 0) {
          this.$Message.error(res.message);
          this.loading = false;
          return;
        }
        this.data = res.data;
        this.dataCount = res.page.total;
        this.loading = false;
      });
    },
    // 阻止默认的上传行为
    beforeUpload(file) {
      this.file = file;
      return false;
    },
    // 上传
    upload() {
      this.loadingStatus = true;
      let fd = new FormData();
      fd.append("address", this.file);
      addFilePlan(fd).then((res) => {
        if (res.status !== 0) {
          this.$Message.error(res.message);
          this.loadingStatus = false;
          return;
        }
        this.file = null;
        this.loadingStatus = false;
        this.$Message.success(res.message);
        this.getFileList(1, this.pageSize);
      });
    },
    // 取消本次选择的文件
    handleRemove() {
      this.file = null;
    },
    // 搜索功能
    fileSearch() {
      this.loading = true;
      this.getFileList(1, this.pageSize, this.search);
    },
    // 监听页码发生改变
    changePage(index) {
      clearTimeout(this.timer);
      this.page = index;
      this.loading = true;
      this.debounce(this.page, this.pagesize, this.search);
    },
    // 切换分页防抖
    debounce(pageno, pagesize, search) {
      this.timer = setTimeout(() => {
        this.getFileList(pageno, pagesize, search);
        this.loading = false;
      }, 160);
    },
    // 删除
    removeFile(index) {
      this.$Modal.confirm({
        title: "确认删除吗？",
        onOk: async () => {
          const res = await removeFilePlan(this.data[index].id);
          if (res.status !== 0) return this.$Message.error(res.message);
          this.$Message.error('删除文件成功！');
          this.getFileList(1, this.pageSize)
        },
        onCancel: () => {
          this.$Message.error('取消删除')
        }
      });
    },
    downloadFile(index) {
      this.$Modal.confirm({
        title: "确认下载吗？",
        onOk: async () => {
          const res = await downloadFilePlan(this.data[index].id);
          if (res.status !== 0) return this.$Message.error(res.message);
          window.open("http://127.0.0.1" + res.data.address);
        },
        onCancel: () => {
          this.$Message.error('取消下载')
        }
      });
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
.bottom {
  display: flex;
  justify-content: space-between;
  padding: 20px 20px;
}
</style>