// composables/useAuth.ts
import { ref, inject, provide } from 'vue'

const key = Symbol('auth')

export function provideAuth() {
  const userType = ref(sessionStorage.getItem('userType') || 'tabs')

  const setUserType = (type: string) => {
    userType.value = type
    sessionStorage.setItem('userType', type)
  }

  const logout = () => {
    userType.value = 'tabs'
    sessionStorage.removeItem('userType')
  }

  provide(key, { userType, setUserType, logout })

  // ✅ Return it here for App.vue
  return { userType, setUserType, logout }
}

export function useAuth() {
  const context = inject<{
    userType: Ref<string>
    setUserType: (type: string) => void
    logout: () => void
  }>(key)

  if (!context) {
    throw new Error('Auth context not provided')
  }

  return context
}
