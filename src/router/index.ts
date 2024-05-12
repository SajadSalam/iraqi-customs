import { setupLayouts } from 'virtual:generated-layouts'
import { createRouter, createWebHistory } from 'vue-router'
import { isUserLoggedIn } from './utils'
import routes from '~pages'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...setupLayouts(routes),
  ],
})

const userData = localStorage.getItem('userData')
const user = userData ? JSON.parse(userData) : null

router.beforeEach((to, from, next) => {
  if (to.name !== 'login' && to.name !== 'index') {
    if (!isUserLoggedIn())
      return next({ name: 'login' })
  }

  return next()
})

// Docs: https://router.vuejs.org/guide/advanced/navigation-guards.html#global-before-guards

export default router
