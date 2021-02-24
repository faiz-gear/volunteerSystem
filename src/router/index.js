import Vue from 'vue'
import Router from 'vue-router'

const VolunteerMessage = () => import('../views/volunteer/VolunteerMessage.vue')
const DepartmentClass = () => import('../views/department/DepartmentClass.vue')
const DepartmentMember = () => import('../views/department/DepartmentMember.vue')
const FilePlan = () => import('../views/file/FilePlan.vue')
const FileOther = () => import('../views/file/FileOther.vue')
const ActivityMessage = () => import('../views/activity/ActivityMessage.vue')
const ActivityClass = () => import('../views/activity/ActivityClass.vue')

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/volunteerMessage',
      component: VolunteerMessage
    },
    {
      path: '/departmentClass',
      component: DepartmentClass
    },
    {
      path: '/departmentMember',
      component: DepartmentMember
    },
    {
      path: '/filePlan',
      component: FilePlan
    },
    {
      path: '/fileOther',
      component: FileOther
    },
    {
      path: '/activityMessage',
      component: ActivityMessage
    },
    {
      path: '/activityClass',
      component: ActivityClass
    }

  ]
})

export default router
