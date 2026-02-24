<template>
    <div class="absolute" ref="container">
        <button
            @click="open = !open"
            class="flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-200 transition"
        >
            <Icon name="heroicons:user" />
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
            @click="(open = false)"
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
import { useAuthStore } from '~/stores/auth';
import { onClickOutside } from '@vueuse/core'

const open = ref(false)
const authStore = useAuthStore()
const container = ref(null)

onClickOutside(container, () => open.value = false)

async function logout() {
    open.value = false
    await authStore.logout()
}
</script>