import { defineStore } from "pinia";
import type { User } from "~/types/User";
const apiUrl = import.meta.env.VITE_API_URL

export const useAuthStore = defineStore('user', () => {
    const user = ref<User | null>(null)
    const token = useCookie('auth_token')
    const loading = ref(false)
    const error = ref<string | null>(null)

    const isLoggedIn = computed(() => !!token.value && !!user.value)

    async function register(firstname: string, lastname: string, email: string, password: string) {
        const projectsStore = useProjectStore()

        loading.value = true
        error.value = null

        try {
            const data = await $fetch<{ user: User; token: string }>(`${apiUrl}/register`, {
                method: 'POST',
                body: { firstname, lastname, email, password }
            })

            user.value = data.user
            token.value = data.token

            projectsStore.fetchAll()

            await navigateTo('/dashboard')
        } catch (err: any) {
            error.value = err?.data?.message ?? 'Erreur lors de l\'inscription'
        } finally {
            loading.value = false
        }
    }

    async function login(email: string, password: string) {
        const projectsStore = useProjectStore()
        loading.value = true
        error.value = null

        try {
            const data = await $fetch<{ user: User; token: string }>(`${apiUrl}/login`, {
                method: 'POST',
                body: { email, password }
            })

            user.value = data.user
            token.value = data.token

            projectsStore.fetchAll()

            await navigateTo('/dashboard')
        } catch (err: any) {
            error.value = err?.data?.message ?? 'Email ou mot de passe incorrect'
        } finally {
            loading.value = false
        }
    }

    async function logout() {
        const projectsStore = useProjectStore()

        try {
            await $fetch(`${apiUrl}/logout`, { method: 'POST' })
        } finally {
            projectsStore.reset()
            user.value = null
            token.value = null
            await navigateTo('/')
        }
    }

    async function fetchMe() {
        if (!token.value) return

        try {
            const data = await $fetch<{ user: User }>(`${apiUrl}/me`, {
                headers: { Authorization: `Bearer ${token.value}` }
            })
            user.value = data.user
        } catch {
            user.value = null
            token.value = null
        }
    }

    return { user, token, loading, error, isLoggedIn, register, login, logout, fetchMe }
})