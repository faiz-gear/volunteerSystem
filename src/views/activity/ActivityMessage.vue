<template>
  <div id="content" class="l">
    <Breadcrumb class="mgleft">
      <BreadcrumbItem>活动管理</BreadcrumbItem>
      <BreadcrumbItem to="/volunteerMessage">活动信息</BreadcrumbItem>
    </Breadcrumb>
    <div class="activity-list">
      <div class="activity-item" v-for="item in showData">
        <div class="activity-name">
          <h1>
            {{ item.name }}
            <span :style="getStyle(item.status)">{{ item.status }}</span>
          </h1>
        </div>
        <div class="activity-content">
          <h1 class="title">活动简介</h1>
          <p class="desc">{{ item.description }}</p>
          <div class="progress">
            <p>当前志愿者招募进度：</p>
            <Progress
              :percent="parseFloat((item.regNumber / item.targetNumber) * 100)"
              :stroke-color="['#108ee9', '#87d068']"
            />
          </div>
        </div>
        <div class="bottom">
          <Row style="font-size: 14px; font-weight: bold">
            <Col span="12">活动时间</Col>
            <Col span="12">活动负责人</Col>
          </Row>
          <Row>
            <Col span="12">{{ item.time }}</Col>
            <Col span="12">{{ item.charge }}</Col>
          </Row>
        </div>
        <page
          style="position: absolute; right: 82px; bottom: 10px"
          :total="dataCount"
          :page-size="pageSize"
          @on-change="changePage"
          show-elevator
        ></page>
      </div>
    </div>
  </div>
</template>

<script>
import ContentManage from "../../components/common/contentManage/ContentManage";

export default {
  name: "ActivityMessage",
  components: {
    ContentManage,
  },
  data() {
    return {
      activityData: [
        {
          name: "关爱抗战老兵",
          status: "已结束",
          description: "这是关爱抗战老兵活动",
          targetNumber: "20",
          regNumber: "20",
          time: "2021-03-06",
          charge: "张三",
        },
        {
          name: "科技馆",
          status: "已结束",
          description: "这是科技馆活动",
          targetNumber: "20",
          regNumber: "15",
          time: "2021-03-07",
          charge: "张三",
        },
        {
          name: "关爱抗战老兵",
          status: "进行中",
          description: "这是关爱抗战老兵活动",
          targetNumber: "20",
          regNumber: "20",
          time: "2021-03-08",
          charge: "张三",
        },
        {
          name: "科技馆",
          status: "进行中",
          description: "这是科技馆活动",
          targetNumber: "20",
          regNumber: "15",
          time: "2021-03-09",
          charge: "张三",
        },
        {
          name: "科技馆",
          status: "进行中",
          description: "这是科技馆活动",
          targetNumber: "20",
          regNumber: "15",
          time: "2021-03-10",
          charge: "张三",
        },
        {
          name: "关爱抗战老兵",
          status: "进行中",
          description: "这是关爱抗战老兵活动",
          targetNumber: "20",
          regNumber: "20",
          time: "2021-03-11",
          charge: "张三",
        },
        {
          name: "关爱抗战老兵",
          status: "进行中",
          description: "这是关爱抗战老兵活动",
          targetNumber: "20",
          regNumber: "20",
          time: "2021-03-12",
          charge: "张三",
        },
        {
          name: "科技馆",
          status: "已取消",
          description: "这是科技馆活动",
          targetNumber: "20",
          regNumber: "15",
          time: "2021-03-01",
          charge: "张三",
        },
        {
          name: "关爱抗战老兵",
          status: "已结束",
          description: "这是关爱抗战老兵活动",
          targetNumber: "20",
          regNumber: "20",
          time: "2021-03-02",
          charge: "张三",
        },
        {
          name: "阳光周末",
          status: "已结束",
          description:
            "这是阳光周末活动,平面设计（graphic design），也称为视觉传达设计，是以“视觉”作为沟通和表现的方式，透过多种方式来创造和结合符号、图片和文字，借此作出用来传达想法或讯息的视觉表现。平面设计（graphic design），也称为视觉传达设计，是以“视觉”作为沟通和表现的方式，透过多种方式来创造和结合符号、图片和文字，借此作出用来传达想法或讯息的视觉表现。",
          targetNumber: "20",
          regNumber: "7",
          time: "2021-03-03",
          charge: "张三",
        },
        {
          name: "敬老院",
          status: "已结束",
          description: "这是敬老院活动",
          targetNumber: "20",
          regNumber: "6",
          time: "2021-03-04",
          charge: "张三",
        },
        {
          name: "科技馆",
          status: "已结束",
          description: "这是科技馆活动",
          targetNumber: "20",
          regNumber: "15",
          time: "2021-03-05",
          charge: "张三",
        },
      ],
      ajaxHistoryData: [],
      // 初始化信息总条数
      dataCount: 0,
      // 每页显示条数
      pageSize: 6,
      // 当前页码
      page: 1,
      // 每页显示信息存储
      showData: [],
    };
  },
  created() {
    function compare(time) {
      return function (a, b) {
        let o = +new Date(a[time]);
        let j = new Date(b[time]);
        if (o > j) return -1;
        if (o < j) return 1;
        return 0;
      };
    }
    this.activityData.sort(compare("time"));
    this.handleListHistory();
  },
  methods: {
    getStyle(status) {
      switch (status) {
        case "进行中":
          return "background-color: #27ae60;";
        case "已取消":
          return "background-color: #ee5253;";
        case "已结束":
          return "background-color: #95a5a6;";
      }
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
    //初始化页面， 获取历史记录信息
    handleListHistory() {
      // 保存取到的所有数据
      this.ajaxHistoryData = this.activityData;
      this.dataCount = this.activityData.length;
      // console.log(this.data);
      this.refreshShowData();
    }, //封装数据分页
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
  },
};
</script>
  
<style>
#content {
  background-color: #f5f7f9 !important;
  width: 100%;
}
.activity-list {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
  padding: 10px;
}
.activity-item {
  width: 30%;
  height: 300px;
  margin: 10px;
  border: 1px solid #dcdee2;
}
.activity-item:hover {
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}
.activity-name {
  border-bottom: 2px solid #e5e5e5;
  height: 50px;
}
.activity-name h1 {
  display: flex;
  justify-content: space-between;
  padding: 15px;
  font-weight: 600;
  font-size: 14px;
}
.activity-name h1 span {
  background-color: #23b7e5;
  color: #fff;
  padding: 2px 5px;
  border-radius: 4px;
}
.activity-content {
  padding: 15px;
  background-color: #fff;
  height: 165px;
}
.title {
  font-weight: bold;
  padding-bottom: 10px;
}
.desc {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  height: 50px;
}
.progress p {
  padding: 20px 0 10px 0;
}
.bottom {
  height: 85px;
  background-color: #fff;
  text-align: center;
  padding: 15px;
}
</style>