import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/main.vue'
import Home from '../views/Home/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    redirect: 'home',
    //设置默认显示路由
    children: [
      {
        path: 'home',
        name: 'Home',
        component: Home
      },
      {
        path: 'shopping',
        name: 'Shopping',
        component: () => import('../views/shopping/Shopping')
      },
      {
        path: 'study',
        name: 'Study',
        component: () => import('../views/study/Study.vue')
      }
    ]
  },
  {
    path: '/event/:id',
    name: 'EventPage',
    component: () => import('../views/EventPage/EventPage')
  },
  {
    path: '/detail/:id',
    //菜谱详情页面
    name: 'details',
    component: () => import('../views/Detail/Detail')
  },
  {
    path: '/coursedetail/:id',
    //商品详情页面
    name: 'coursedetail',
    component: () => import('../views/CourseDetail/CourseDetail')
  },
  {
    path: '/malldetail/:id',
    //课程详情页面
    name: 'malldetail',
    component: () => import('../views/MallDetail/MallDetail')
  },
  {
    path: '*',
    redirect: {
      name: 'Home'
    }
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // 路由级代码拆分
  //   // 这会生成一个单独的块 (about.[hash].js) 对于这条路线
  //   //在访问路线时会延迟加载。
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
