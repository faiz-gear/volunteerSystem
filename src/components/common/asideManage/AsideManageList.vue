<template>
  <div>
        <aside-manage-list-item v-for="(item,index) in listTitle" :key="index" :list-title="listTitle" :list-icon="listIcon" 
                                :list-item-title="listItemTitle" :list-item-icon="listItemIcon">
        </aside-manage-list-item>
  </div>
</template>

<script>
import AsideManageListItem from "./AsideManageListItem";

export default {
  name: "AsideManageList",
  components: {
    AsideManageListItem,
  },
  props:{
    listTitle: {
      type: Array,
      default() {
        return [];
      },
    },
    listIcon: {
      type: Array,
      default() {
        return [];
      },
    },
    listItemTitle: {
      type: Array,
      default() {
        return [];
      },
    },
    listItemIcon: {
      type: Array,
      default(){
        return [];
      }
    }
  },
  

};
</script>

<style scope>




</style>