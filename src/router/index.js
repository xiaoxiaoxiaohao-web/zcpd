import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
import * as echarts from 'echarts'
import VueCookies from 'vue-cookies'
import 'vant/lib/index.css';
import { Button, Form, Field, CellGroup, Cell, Icon, PasswordInput, NavBar, Search, Toast, Tabbar, TabbarItem,
   DatetimePicker, Popup, Overlay, Uploader, Divider, Calendar, Notify, NoticeBar, Tab, Tabs, Switch, Image, Picker} from 'vant';


import Login from '@/components/Login'
import Index from '@/components/Index'
import Add from '@/components/Add.vue'
import Statistics from '@/components/Statistics'
import My from '@/components/My'
import DetailInfo from '@/components/DetailInfo'
import ChangePsw from '@/components/ChangePsw'

Vue.use(Router)
Vue.use(Button)
Vue.use(Form)
Vue.use(Field)
Vue.use(CellGroup)
Vue.use(Cell)
Vue.use(Icon)
Vue.use(PasswordInput)
Vue.use(NavBar)
Vue.use(Search)
Vue.use(Toast)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(DatetimePicker)
Vue.use(Popup)
Vue.use(Overlay)
Vue.use(Uploader)
Vue.use(Divider)
Vue.use(Calendar)
Vue.use(Notify)
Vue.use(NoticeBar)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(Switch)
Vue.use(Image)
Vue.use(Picker)

Vue.use(VueCookies)
Vue.prototype.$axios = axios
// 全局配置请求根路径
axios.defaults.baseURL = 'http://10.194.69.22:8520/api/zcpd'
// axios.defaults.headers = {
//   'Content-Type': 'application/x-www-form-urlencoded'
// }
axios.defaults.timeout = 3000
Vue.prototype.$echarts = echarts




var router = new Router({
 // mode: 'history',
  routes: [
    {
      path:'/',
      name: ''
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/index',
      name: 'Index',
      component: Index,
      children: [
      ],
      props: true
    },
    {
      path: '/add',
      component: Add,
    },
    // {
    //   path: '/inventory',
    //   component: Inventory
    // },
    {
      path: '/statistics',
      name: 'Statistics',
      component: Statistics
    },
    {
      path: '/my',
      name: 'My',
      component: My
    },
    {
      path: '/detailinfo',
      name: 'DetailInfo',
      component: DetailInfo
    },
    {
      path: '/changepsw',
      name: 'ChangePsw',
      component: ChangePsw
    }
   
  ]
})
// let yhkh = this.$cookies.get('yhkh')

//路由守卫
// router.beforeEach((to, from, next) => {
//   if(to.meta.auth) {
//     if(yhkh != null) {
//       next()
//     }else{
//       next({
//         path: '/'
//       })
//     }
//   }else {
//     next()
//   }
// })

export default router

