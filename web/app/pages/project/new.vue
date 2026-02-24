<template>
    <div class="max-w-md mx-auto mt-10 p-4 border rounded shadow">
        <h1 class="text-2xl font-bold mb-4">Créer un nouveau projet</h1>

        <form @submit.prevent="handleCreate" class="space-y-4">
        <div>
            <label class="block mb-1 font-medium" for="name">Nom du projet</label>
            <input
            id="name"
            v-model="form.name"
            type="text"
            placeholder="Nom du projet"
            required
            class="w-full border px-3 py-2 rounded"
            />
        </div>

        <div class="flex items-center gap-2">
            <input
            id="isPublic"
            type="checkbox"
            v-model="form.isPublic"
            class="w-4 h-4"
            />
            <label for="isPublic">Projet public</label>
        </div>

        <button
            type="submit"
            class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            :disabled="loading"
        >
            {{ loading ? 'Création...' : 'Créer le projet' }}
        </button>
        </form>

        <p v-if="message" :class="messageType === 'error' ? 'text-red-600 mt-4' : 'text-green-600 mt-4'">
        {{ message }}
        </p>
    </div>
</template>

<script setup lang="ts">
import auth from '~/middlewares/auth'
import ProjectService from '~/services/api/ProjectService'
import { reactive, ref } from 'vue'

definePageMeta({ middleware: auth })

const projectStore = useProjectStore()
const form = reactive({ name: '', isPublic: true })
const loading = ref(false)
const message = ref('')
const messageType = ref<'success' | 'error'>('success')

async function handleCreate() {
    loading.value = true
    message.value = ''
    try {
        await ProjectService.create(form.name, form.isPublic)
        await projectStore.fetchAll()
        message.value = 'Projet créé avec succès !'
        messageType.value = 'success'
        form.name = ''
        form.isPublic = true
    } catch (err: any) {
        console.error(err)
        if (err?.data?.message) {
            message.value = err.data.message
        } else if (err?.message) {
            message.value = err.message
        } else {
            message.value = 'Erreur lors de la création du projet.'
        }
        messageType.value = 'error'
    } finally {
        loading.value = false
    }
}

useHead(() => ({
    title: 'Nouveau projet'
}))
</script>
project
ef8b883c-13d2-4e50-8ec2-2d751943ce29

user
b293dc2f-03c1-4a9e-8dc9-b3bd2e0e9c08