<template>
    <div class="flex flex-col items-center justify-center min-h-screen">
        <h1 class="text-4xl mb-8 font-semibold">SimpleFB</h1>

        <form @submit.prevent="handleLogin" class="border bg-white rounded-lg border-gray-300 p-6 space-y-6 w-96">
            <p class="text-center font-semibold text-xl">Connexion</p>

            <div>
                <label class="block font-semibold mb-1">Email</label>
                <input v-model="form.email" type="email" placeholder="Email" class="w-full border hover:border-teal-400 rounded px-3 py-2" required="true" />
            </div>

            <div>
                <label class="block font-semibold mb-1">Mot de passe</label>
                <input v-model="form.password" type="password" placeholder="Mot de passe" class="w-full border hover:border-teal-400 rounded px-2 py-2" required="true" />
            </div>
    
            <div v-if="authStore.error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {{ authStore.error }}
            </div>
    
            <button type="submit" :disabled="authStore.loading" class="border border-teal-400 hover:bg-teal-300 bg-teal-100 hover:shadow p-2 rounded-xl transition mx-auto block">
                {{ authStore.loading ? 'Connexion...' : 'Se connecter' }}
            </button>

            <p class="text-sm text-center">Vous n'avez pas de compte ? <NuxtLink to="/register" class="text-blue-800 hover:underline">Inscrivez vous !</NuxtLink></p>

        </form>
    </div>
</template>

<script setup lang="ts">
import guest from '~/middlewares/guest';

definePageMeta({ middleware: guest, layout: 'landing' })

const authStore = useAuthStore()
const form = reactive({ email: '', password: '' })

async function handleLogin() {
    await authStore.login(form.email, form.password)
}
</script>