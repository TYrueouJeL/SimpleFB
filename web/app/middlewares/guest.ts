import { useAuthStore } from "~/store/auth"

export default defineNuxtRouteMiddleware(() => {
    const { isLoggedIn } = useAuthStore()

    if (isLoggedIn) {
        return navigateTo('/dashboard')
    }
})