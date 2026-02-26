<template>
    <div class="flex flex-col items-center justify-center min-h-screen">
        <h1 class="text-4xl mb-8 font-semibold">SimbleFB | {{ project.name }}</h1>

        <form @submit.prevent="handleNewfeedback" class="border bg-white rounded-lg border-gray-300 p-6 space-y-6 w-96">

        </form>
    </div>
</template>

<script setup lang="ts">
import ProjectService from '~/services/api/ProjectService';

const route = useRoute()

const project = await ProjectService.getBySlug(route.params.slug as string)

definePageMeta({ layout: 'landing' })

useHead(() => ({
    title: 'Nouveau feedback'
}))
</script>