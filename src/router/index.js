import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Encuestas from '../views/PanelEncuestas.vue'
import Profile from '../views/Profile.vue'
import AdminUsuarios from '../views/AdministrarUsuarios.vue'
import AdminEncuestas from '../views/AdministrarEncuestas.vue'
import AdminLugares from '../views/AdministrarLugares.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: "/encuestas",
    name: "encuestas",
    component: Encuestas
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile
  },
  {
    path: "/adminusuarios",
    name: "adminUsuarios",
    component: AdminUsuarios
  },
  {
    path: "/adminencuestas",
    name: "adminEncuestas",
    component: AdminEncuestas
  },
  {
    path: "/adminlugares",
    name: "adminLugares",
    component: AdminLugares
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
