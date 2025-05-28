import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DownloadView from '../views/DownloadView.vue'
import AuthView from '../views/AuthView.vue'
import AuthLogin from '../components/AuthLogin.vue'
import AuthRegister from '../components/AuthRegister.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/download',
      name: 'download',
      component: DownloadView,
    },
    {
      path: '/auth',
      name: 'auth',
      component: AuthView,
      redirect: '/auth/login',
      children: [
        {
          path: '/auth/login',
          name: 'login',
          component: AuthLogin,
        },
        {
          path: '/auth/register',
          name: 'auth-register',
          component: AuthRegister,
        },
      ],
    },
  ],
})

export default router
