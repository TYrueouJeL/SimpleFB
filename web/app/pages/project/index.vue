<template>
    <div>
        <p class="text-2xl font-bold mb-4">Vos projets :</p>

        <div class="my-4 flex justify-center">
            <NuxtLink
            class="border p-2 rounded hover:bg-gray-200 transition duration-300"
            :to="`/project/new`"
            >
                Nouveau projet
            </NuxtLink>
        </div>
    
        <div class="grid grid-cols-3 gap-4 my-4">
            <NuxtLink
            class="p-2 hover:bg-gray-100 border rounded border-gray-200 transition duration-300"
            v-for="project in projects"
            :key="project.id"
            :to="`/project/${project.slug}`"
            >
            <p>
                Nom : {{ project.name }}
            </p>
            <p>
                Date de création : {{ new Date(project.createdAt).toLocaleDateString() }}
            </p>
            </NuxtLink>
        </div>
    </div>
</template>

<script setup lang="ts">
import auth from '~/middlewares/auth'
import ProjectService from '~/services/api/ProjectService'
import type { Project } from '~/types/Project'

definePageMeta({ middleware: auth })

useHead({ title: 'Liste des projets' })

const { data: projects } = await useAsyncData<Project[]>('projects', () =>
    ProjectService.getAll()
)
</script>