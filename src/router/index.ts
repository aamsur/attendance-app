import { createRouter, createWebHistory } from '@ionic/vue-router'
import Tabs from '../pages/Tabs.vue'
import Home from '../pages/Home.vue'
import Landing from '../pages/Landing.vue'
import Records from '../pages/Records.vue'
import CheckIn from '../pages/CheckIn.vue'
import Team from '../pages/Team.vue'
import Profile from '../pages/Profile.vue'
import SignIn from '../pages/SignIn.vue'
import Register from '../pages/Register.vue'
import ForgotPassword from '../pages/ForgotPassword.vue'

const userType = localStorage.getItem('userType') || 'tabs' // Default to 'tabs' if not set

const routes = [
  {
    path: '/',
    redirect: userType === 'tabs' ? '/tabs/home' : '/home'
  },
  {
    path: '/tabs/',
    component: Tabs,
    children: [
      { path: '', redirect: '/tabs/home' },
      { path: 'home', component: Home },
      { path: 'records', component: Records },
      { path: 'check-in', component: CheckIn },
      { path: 'team', component: Team },
      { path: 'profile', component: Profile }
    ]
  },
  // Side menu equivalent flat routes
  { path: '/landing', component: Landing },
  { path: '/profile', component: Profile },

  { path: '/signin', component: SignIn },
  { path: '/register', component: Register },
  { path: '/forgot-password', component: ForgotPassword },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/signin', '/register', '/forgot-password'];
  const authRequired = !publicPages.includes(to.path);
  const userType = sessionStorage.getItem('userType');

  if (authRequired && !userType) {
    return next('/signin'); // 🚫 Not logged in, redirect to login
  }

  next(); // ✅ Allow navigation
});

export default router
