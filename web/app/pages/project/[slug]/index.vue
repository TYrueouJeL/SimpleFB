<template>
    <div>
        <p>Projet {{ project?.name }}</p>
        <p v-if="project?.is_public">Public</p>
        <p v-else>Privé</p>
    </div>
</template>

<script setup lang="ts">
import ProjectService from '~/services/api/ProjectService';
import type { Project } from '~/types/Project';

const route = useRoute()
const slug = route.params.slug as string

const { data: project, refresh } = await useAsyncData<Project>(
    () => `project-${route.params.slug}`,
    () => ProjectService.getBySlug(route.params.slug as string)
)

useHead(() => ({
    title: `Projet ${project.value?.name}`
}))
</script>