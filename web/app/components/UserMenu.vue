<template>
    <div class="absolute">
        <button
            @click="open = !open"
            class="flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-200 transition"
        >
            {{ authStore.user?.firstname || 'Déconnecté' }} {{ authStore.user?.lastname || '' }}
            <span v-if="open">▲</span>
            <span v-else>▼</span>
        </button>

        <div
        v-if="open"
        class="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg"
        >
        <NuxtLink
            v-if="!authStore.isLoggedIn"
            to="/login"
            class="block px-4 py-2 hover:bg-gray-100"
        >
            Se connecter
        </NuxtLink>
        <button
            v-else
            @click="logout"
            class="w-full text-left px-4 py-2 hover:bg-gray-100"
        >
            Se déconnecter
        </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/store/auth';

const open = ref(false)
const authStore = useAuthStore()

async function logout() {
    open.value = false
    await authStore.logout()
}
</script>