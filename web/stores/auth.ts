import { defineStore } from 'pinia'
import type { User } from '~/types/User'
import { useAuthService } from '~/services/api/AuthService'

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: null,
    isAuthenticated: false
  }),

  getters: {
    currentUser: (state) => state.user,
    isLoggedIn: (state) => state.isAuthenticated,
    getToken: (state) => state.token,
    userRole: (state) => state.user?.role,
    isAdmin: (state) => state.user?.role === 'admin'
  },

  actions: {
    async login(email: string, password: string) {
      const authService = useAuthService()

      try {
        const response = await authService.login({ email, password })

        this.user = response.user
        this.token = response.token
        this.isAuthenticated = true

        // Stocker le token dans localStorage pour la persistance
        if (process.client) {
          localStorage.setItem('auth_token', response.token)
        }

        return { success: true }
      } catch (error: any) {
        console.error('Erreur de connexion:', error)
        return {
          success: false,
          message: error?.data?.message || 'Erreur de connexion'
        }
      }
    },

    async register(userData: { name: string; email: string; password: string }) {
      const authService = useAuthService()

      try {
        const response = await authService.register(userData)

        this.user = response.user
        this.token = response.token
        this.isAuthenticated = true

        // Stocker le token dans localStorage
        if (process.client) {
          localStorage.setItem('auth_token', response.token)
        }

        return { success: true }
      } catch (error: any) {
        console.error('Erreur d\'inscription:', error)
        return {
          success: false,
          message: error?.data?.message || 'Erreur d\'inscription'
        }
      }
    },

    async logout() {
      const authService = useAuthService()

      try {
        if (this.token) {
          await authService.logout(this.token)
        }
      } catch (error) {
        console.error('Erreur de déconnexion:', error)
      } finally {
        this.clearAuth()
      }
    },

    async fetchCurrentUser() {
      const authService = useAuthService()

      if (!this.token) {
        // Essayer de récupérer le token depuis localStorage
        if (process.client) {
          const storedToken = localStorage.getItem('auth_token')
          if (storedToken) {
            this.token = storedToken
          } else {
            return
          }
        } else {
          return
        }
      }

      try {
        const user = await authService.getCurrentUser(this.token)
        this.user = user
        this.isAuthenticated = true
      } catch (error) {
        console.error('Erreur de récupération de l\'utilisateur:', error)
        // Token invalide, nettoyer l'état
        this.clearAuth()
      }
    },

    async updateProfile(userData: Partial<User>) {
      const authService = useAuthService()

      if (!this.token) return { success: false, message: 'Non authentifié' }

      try {
        const updatedUser = await authService.updateProfile(this.token, userData)
        this.user = updatedUser
        return { success: true }
      } catch (error: any) {
        console.error('Erreur de mise à jour du profil:', error)
        return {
          success: false,
          message: error?.data?.message || 'Erreur de mise à jour'
        }
      }
    },

    setToken(token: string) {
      this.token = token
      if (process.client) {
        localStorage.setItem('auth_token', token)
      }
    },

    clearAuth() {
      this.user = null
      this.token = null
      this.isAuthenticated = false
      if (process.client) {
        localStorage.removeItem('auth_token')
      }
    }
  }
})



