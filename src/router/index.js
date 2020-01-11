import Vue from 'vue'
import VueRouter from 'vue-router'
const Layout = () => import('@/views/layout')
const Home = () => import('@/views/home')
const Question = () => import('@/views/question')
const Video = () => import('@/views/video')
const User = () => import('@/views/user')
const Profile = () => import('@/views/user/profile')
const Chat = () => import('@/views/user/chat')
const Login = () => import('@/views/login')
const Acticle = () => import('@/views/acticle')
const Search = () => import('@/views/search')
const Result = () => import('@/views/search/result')
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Layout, // 一级路由
    children: [{
      path: '/',
      component: Home // 二级路由
    },
    {
      path: '/question',
      component: Question // 二级路由
    },
    {
      path: '/video',
      component: Video // 二级路由
    },
    {
      path: '/user',
      component: User // 二级路由
    }]
  },
  {
    path: '/user/profile',
    component: Profile
  },
  {
    path: '/user/chat',
    component: Chat
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/acticle',
    component: Acticle
  },
  {
    path: '/search',
    component: Search
  },
  {
    path: '/result',
    component: Result
  }
]

const router = new VueRouter({
  routes
})
export default router
