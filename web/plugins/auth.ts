export default defineNuxtPlugin(async (nuxtApp) => {
  const authStore = useAuthStore()

  // Initialiser l'authentification au chargement de l'app
  if (process.client) {
    await authStore.fetchCurrentUser()
  }
})

