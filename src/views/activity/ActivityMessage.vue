<template>
  <div id="content" class="l">
      <div class="activity-list" >
        <div class="activity-item" v-for="item in activityData">
            <div class="activity-name">
                {{item.name}}
            </div>
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
        activityData:[
            {
                name: '阳光周末',
                status: '进行中',
                description: '这是阳光周末活动',
                targetNumber: '20',
                regNumber: '8'
            },
            {
                name: '敬老院',
                status: '已结束',
                description: '这是敬老院活动',
                targetNumber: '20',
                regNumber: '8'
            },
            {
                name: '科技馆',
                status: '已取消',
                description: '这是科技馆活动',
                targetNumber: '20',
                regNumber: '8'
            },
            {
                name: '关爱抗战老兵',
                status: '进行中',
                description: '这是关爱抗战老兵活动',
                targetNumber: '20',
                regNumber: '8'
            }
        ]
    };
  },
};
</script>
  
<style>
#content {
    background-color: #f5f7f9!important;
}
.activity-list {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  height: 100%;
  padding: 10px;
}
.activity-item {
  width: 30%;
  height: 300px;
  padding: 10px;
  margin: 10px;
  border: 1px solid #dcdee2;
}
</style>