import type { User } from '~/types/User'

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  name: string
  email: string
  password: string
}

export interface AuthResponse {
  user: User
  token: string
}

export class AuthService {
  private apiBase: string

  constructor(apiBase: string) {
    this.apiBase = apiBase
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    return await $fetch<AuthResponse>(`${this.apiBase}/login`, {
      method: 'POST',
      body: credentials
    })
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    return await $fetch<AuthResponse>(`${this.apiBase}/register`, {
      method: 'POST',
      body: data
    })
  }

  async logout(token: string): Promise<void> {
    await $fetch(`${this.apiBase}/logout`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }

  async getCurrentUser(token: string): Promise<User> {
    return await $fetch<User>(`${this.apiBase}/me`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }

  async updateProfile(token: string, data: Partial<User>): Promise<User> {
    return await $fetch<User>(`${this.apiBase}/profile`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: data
    })
  }
}

// Composable pour utiliser le service d'authentification
export const useAuthService = () => {
  const config = useRuntimeConfig()
  return new AuthService(config.public.apiBase)
}

