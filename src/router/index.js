import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Privacy from '../views/policy/privacy'
import Service from '../views/policy/service'
import Login from "../views/Login"
import Songs from "../views/Songs"
import Player from '../components/SongPlayer'
import UserManual from "../views/UserManual"
import About from '../views/About'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/user_manual',
    name: 'user_manual',
    component: UserManual
  },
  {
    path: '/privacy',
    name: 'privacy',
    component: Privacy
  },
  {
    path: '/service',
    name: 'service',
    component: Service
  },
  {
    path: '/songs',
    name: 'songs',
    component: Songs
  },
  {
    path: '/player',
    name: 'player',
    component: Player
  },
  {
    path: '/about',
    name: 'about',
    component: About
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
