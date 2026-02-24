<template>
    <div class="flex items-center justify-center min-h-screen">
        <form @submit.prevent="handleLogin" class="border rounded-lg border-gray-300 p-6 space-y-6 w-96 text-center">
            <div>
                <label class="block font-semibold mb-1">Email</label>
                <input v-model="form.email" type="email" placeholder="Email" class="w-min border rounded px-2 py-2" required="true" />
            </div>

            <div>
                <label class="block font-semibold mb-1">Mot de passe</label>
                <input v-model="form.password" type="password" placeholder="Mot de passe" class="w-min border rounded px-2 py-2" required="true" />
            </div>
    
            <div v-if="authStore.error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {{ authStore.error }}
            </div>
    
            <button type="submit" :disabled="authStore.loading" class="border rounded p-2 hover:bg-gray-300 transition duration-300">
                {{ authStore.loading ? 'Connexion...' : 'Se connecter' }}
            </button>
        </form>
    </div>
</template>

<script setup lang="ts">
import guest from '~/middlewares/guest';
import { useAuthStore } from '~/stores/auth';

definePageMeta({ middleware: guest })

const authStore = useAuthStore()
const form = reactive({ email: '', password: '' })

async function handleLogin() {
    await authStore.login(form.email, form.password)
}
</script>