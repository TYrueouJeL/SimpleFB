export const useAuth = () => {
  const authStore = useAuthStore()

  return {
    // State
    user: computed(() => authStore.currentUser),
    isLoggedIn: computed(() => authStore.isLoggedIn),
    token: computed(() => authStore.getToken),
    isAdmin: computed(() => authStore.isAdmin),

    // Actions
    login: authStore.login,
    register: authStore.register,
    logout: authStore.logout,
    updateProfile: authStore.updateProfile,
    fetchCurrentUser: authStore.fetchCurrentUser
  }
}

