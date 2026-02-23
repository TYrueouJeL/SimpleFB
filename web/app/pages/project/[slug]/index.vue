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

const { data: project } = await useAsyncData<Project>('project', () =>
    ProjectService.getBySlug(slug)
)

useHead(() => ({
    title: `Projet ${project.value?.name}`
}))
</script>