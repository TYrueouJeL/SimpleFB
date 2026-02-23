export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore()

  // Vérifier si l'utilisateur est déjà authentifié
  if (!authStore.isAuthenticated) {
    // Essayer de récupérer l'utilisateur actuel avec le token stocké
    await authStore.fetchCurrentUser()
  }

  // Si toujours pas authentifié, rediriger vers la page de connexion
  if (!authStore.isAuthenticated) {
    return navigateTo('/login')
  }
})

