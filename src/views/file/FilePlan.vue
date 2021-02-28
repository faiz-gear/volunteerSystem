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
        />
      </div>
      <div class="content_main">
        <div class="table">
          <Table
            border
            ref="selection"
            :columns="columns4"
            :data="showData"
          ></Table>
        </div>
        <div class="bottom">
          <div>
            <Button>批量下载</Button>
            <Button>批量删除</Button>
            <Upload
              action="//jsonplaceholder.typicode.com/posts/"
              style="display: inline-block"
              :format="['doc', 'docx']"
              :on-format-error="handleFormatError"
              :on-success="handleSuccess"
              :show-upload-list="false"
            >
              <Button icon="ios-cloud-upload-outline" type="success"
                >文件上传</Button
              >
            </Upload>
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

export default {
  name: "FilePlan",
  components: {
    ContentManage,
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
      ],
      data1: [
        {
          name: "安全专项方案.doc",
          size: "21.3kb",
          address: "2016-03-14",
          date: "2016-10-02",
        },
        {
          name: "安全专项方案.doc",
          size: "21.3kb",
          address: "2016-03-14k",
          date: "2016-10-04",
        },
        {
          name: "安全专项方案.doc",
          size: "21.3kb",
          address: "2016-03-14",
          date: "2016-10-03",
        },
        {
          name: "安全专项方案.doc",
          size: "21.3kb",
          address: "2016-03-14",
          date: "2016-10-01",
        },
        {
          name: "安全专项方案.doc",
          size: "21.3kb",
          address: "2016-03-14",
          date: "2016-10-02",
        },
        {
          name: "安全专项方案.doc",
          size: "21.3kb",
          address: "2016-03-14k54564",
          date: "2016-10-04",
        },
      ],
      // 初始化信息总条数
      dataCount: 0,
      // 每页显示条数
      pageSize: 12,
      // 当前页码
      current: 1,
      // 每页显示信息存储
      showData: [],
    };
  },
  created() {
    this.init();
  },
  methods: {
    changePage(index) {
      this.page = index;
      //   console.log(this.page);
      let _start = (index - 1) * this.pageSize;
      let _end = index * this.pageSize;
      this.showData = this.data1.slice(_start, _end);
      this.loading = true;
    },
    //封装数据分页
    refreshShowData() {
      if (this.data1.length <= this.pageSize) {
        this.showData = this.data1;
      } else {
        this.showData = this.data1.slice(0, this.pageSize);
      }
    },
    // 初始化
    init() {
      this.dataCount = this.data1.length;
      this.refreshShowData();
      // console.log(this.showData);
    },
    // 上传文件格式错误的回调函数
    handleFormatError(file) {
      this.$Notice.warning({
        title: "选择上传的文件格式不正确，请重新选择!",
        desc: "文件格式 " + file.name + " 不正确, 请选择doc格式的文件.",
      });
    },
    // 上传文件成功时的回调
    handleSuccess(res, file) {
      /* file.url =
        "https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar";
      file.name = "7eb99afb9d5f317c912f08b5212fd69a"; */
      var name = file.name;
      var size = file.size;
      size = this.filterSize(size);
      var date = this.getTime();
      this.data1.push({name, size, date});
      this.$Message.success('文件上传成功')
    },
    // 换算文件大小方法
    filterSize(size) {
      if (!size) return "";
      if (size < this.pow1024(1)) return size + " B";
      if (size < this.pow1024(2))
        return (size / this.pow1024(1)).toFixed(2) + " KB";
      if (size < this.pow1024(3))
        return (size / this.pow1024(2)).toFixed(2) + " MB";
      if (size < this.pow1024(4))
        return (size / this.pow1024(3)).toFixed(2) + " GB";
      return (size / pow1024(4)).toFixed(2) + " TB";
    },
    pow1024(num) {
      return Math.pow(1024, num);
    },
    getTime() {
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      month = month < 10 ? "0" + month : month;
      var day = date.getDate();
      day = day < 10 ? "0" + day : day;
      return year + "-" + month + "-" + day;
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