import { useAuthStore } from "~/stores/auth"

export default defineNuxtRouteMiddleware(() => {
    const { isLoggedIn } = useAuthStore()

    if (isLoggedIn) {
        return navigateTo('/dashboard')
    }
})