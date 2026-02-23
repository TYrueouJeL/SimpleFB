<template>
    <div class="grid grid-cols-3 gap-4">
        <NuxtLink
        class="p-2 hover:bg-gray-100 rounded"
        v-for="project in projects"
        :key="project.id"
        :to="`/project/${project.slug}`"
        >
            {{ project.name }}
        </NuxtLink>
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