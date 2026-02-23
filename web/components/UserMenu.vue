<template>
  <div class="relative" ref="menuRef">
    <button
      @click="toggleMenu"
      class="flex items-center space-x-2 text-gray-700 hover:text-gray-900 focus:outline-none"
    >
      <div class="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium">
        {{ userInitials }}
      </div>
      <span class="text-sm font-medium">{{ user?.name }}</span>
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    <div
      v-if="isOpen"
      class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200"
    >
      <div class="px-4 py-2 text-xs text-gray-500 border-b">
        {{ user?.email }}
      </div>

      <NuxtLink
        to="/profile"
        @click="closeMenu"
        class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        Mon profil
      </NuxtLink>

      <NuxtLink
        v-if="isAdmin"
        to="/admin"
        @click="closeMenu"
        class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        Administration
      </NuxtLink>

      <button
        @click="handleLogout"
        class="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
      >
        Déconnexion
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const { user, logout, isAdmin } = useAuth()
const isOpen = ref(false)
const menuRef = ref<HTMLElement | null>(null)

const userInitials = computed(() => {
  if (!user.value?.name) return '?'
  const names = user.value.name.split(' ')
  if (names.length >= 2) {
    return `${names[0][0]}${names[1][0]}`.toUpperCase()
  }
  return user.value.name.substring(0, 2).toUpperCase()
})

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}

const closeMenu = () => {
  isOpen.value = false
}

const handleLogout = async () => {
  await logout()
  closeMenu()
  navigateTo('/login')
}

// Fermer le menu si on clique en dehors
const handleClickOutside = (event: MouseEvent) => {
  if (menuRef.value && !menuRef.value.contains(event.target as Node)) {
    closeMenu()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

