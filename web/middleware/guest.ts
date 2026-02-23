export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore()

  // Vérifier si l'utilisateur est déjà authentifié
  if (!authStore.isAuthenticated) {
    await authStore.fetchCurrentUser()
  }

  // Si authentifié, rediriger vers le dashboard
  if (authStore.isAuthenticated) {
    return navigateTo('/dashboard')
  }
})

