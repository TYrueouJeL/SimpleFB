<template>
    <NuxtLink :to="`/project/${project?.slug}`" class="inline-flex items-center gap-2 text-gray-400"><Icon name="mdi:arrow-left"/>Retour</NuxtLink>
    
    <div class="max-w-md mx-auto mt-10 p-4 border-xl bg-white shadow rounded text-center">
        <h1 class="text-2xl font-bold mb-4">Modifier le projet</h1>
        
        <form @submit.prevent="handleUpdate" class="space-y-4">
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

        <button type="submit" :disabled="loading" class="border rounded p-2 hover:bg-gray-300 transition duration-300">
            {{ loading ? 'Création...' : 'Modifier' }}
        </button>
        </form>

        <p v-if="message" :class="messageType === 'error' ? 'text-red-600 mt-4' : 'text-green-600 mt-4'">
        {{ message }}
        </p>
    </div>

    <div class="text-center mt-4">
        <button @click="handleDelete" class="border border-red-400 p-2 bg-red-100 rounded hover:bg-red-300 hover:shadow-lg transition">Supprimer le projet</button>
    </div>
</template>

<script setup lang="ts">
import auth from '~/middlewares/auth'
import ProjectService from '~/services/api/ProjectService'
import { reactive, ref } from 'vue'
import type { Project } from '~/types/Project'

definePageMeta({ middleware: auth })

const route = useRoute()

const { data: project } = await useAsyncData<Project>(
    () => `project-${route.params.slug}`,
    () => ProjectService.getBySlug(route.params.slug as string)
)

const projectStore = useProjectStore()
const form = reactive({ name: project.value?.name, isPublic: project.value?.isPublic })
const loading = ref(false)
const message = ref('')
const messageType = ref<'success' | 'error'>('success')

async function handleUpdate() {
    loading.value = true
    message.value = ''
    try {
        const createdProject = await ProjectService.update(project.value?.slug as string, form.name, form.isPublic)
        await projectStore.fetchAll()
        message.value = 'Projet modifié avec succès !'
        messageType.value = 'success'
        form.name = ''
        form.isPublic = true

        await refreshNuxtData(`project-${project.value?.slug}`)

        navigateTo(`/project/${createdProject.slug}`)
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

async function handleDelete() {
    loading.value = true
    message.value = ''
    try {
        await projectStore.invalidate(project.value?.slug as string)
        await ProjectService.delete(project.value?.slug as string)

        message.value = 'Projet suppprimé avec succès !'
        messageType.value = 'success'

        navigateTo(`/project`)
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