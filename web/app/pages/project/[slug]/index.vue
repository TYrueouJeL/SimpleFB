<template>
    <div>
        <h1 class="text-2xl font-bold mb-4">Projet {{ project?.name }}</h1>
        
        <NuxtLink to="/project" class="inline-flex items-center gap-2 text-gray-400"><Icon name="mdi:arrow-left"/>Retour</NuxtLink>
        
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 my-6
            max-w-5xl mx-auto">
            <div class="w-full bg-white rounded-xl border border-gray-200
            p-5 flex flex-col justify-between hover:shadow-md transition">

                <div class="flex items-center justify-between text-gray-500 text-sm">
                    <span>Visibilité</span>
                    <Icon 
                        :name="project?.isPublic ? 'mdi:earth' : 'mdi:lock'"
                        :class="project?.isPublic ? 'text-green-500' : 'text-red-500'"
                        size="18"
                    />
                </div>

                <div class="text-lg font-semibold">
                    {{ project?.isPublic ? 'Public' : 'Privé' }}
                </div>
            </div>


            <div class="w-full bg-white rounded-xl border border-gray-200
            p-5 flex flex-col justify-between hover:shadow-md transition">

                <div class="flex items-center justify-between text-gray-500 text-sm">
                    <span>Feedbacks</span>
                    <Icon name="mdi:message-outline" class="text-blue-500" size="18"/>
                </div>

                <div>
                    <p class="text-2xl font-bold leading-none">{{ feedbacks?.length }}</p>
                    <p class="text-xs text-gray-400 mt-1">Total reçus</p>
                </div>
            </div>


            <div class="w-full bg-white rounded-xl border border-gray-200
            p-5 flex flex-col justify-between hover:shadow-md transition">

                <div class="flex items-center justify-between text-gray-500 text-sm">
                    <span>Note moyenne</span>
                    <Icon name="mdi:star" class="text-yellow-400" size="18"/>
                </div>

                <div>
                    <div class="flex mb-1">
                        <Icon
                        v-for="i in 5"
                        :key="i"
                        :name="
                            i <= Math.floor(averageRating)
                            ? 'mdi:star'
                            : i === Math.ceil(averageRating) && averageRating % 1 >= 0.5
                            ? 'mdi:star-half-full'
                            : 'mdi:star-outline'
                        "
                        class="text-yellow-400"
                        size="18"
                        />
                    </div>

                    <p class="text-xl font-semibold leading-none">
                        {{ roundedAverage }}
                        <span class="text-gray-400 text-sm font-normal">/ 5</span>
                    </p>
                </div>
            </div>

        </div>

        <div>
            <h2 class="text-xl font-semibold mb-4">Feedbacks</h2>
            <div v-for="feedback in feedbacks" class="border rounded p-2 my-2">
                <div>
                    <p class="font-semibold">{{ feedback.title }}</p>

                    <div class="flex items-center gap-1">
                        <Icon
                            v-for="i in 5"
                            :key="i"
                            :name="i <= feedback.note ? 'mdi:star' : 'mdi:star-outline'"
                            :class="i <= feedback.note ? 'text-yellow-400' : 'text-gray-300'"
                        />
                    </div>
                </div>
                <p class="text-sm text-gray-500">Créé le {{ new Date(feedback.createdAt).toLocaleDateString() }}</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import ProjectService from '~/services/api/ProjectService';
import type { Feedback } from '~/types/Feedback';
import type { Project } from '~/types/Project';

const route = useRoute()

const { data: project } = await useAsyncData<Project>(
    () => `project-${route.params.slug}`,
    () => ProjectService.getBySlug(route.params.slug as string)
)

const { data: feedbacks, refresh: refreshFeedbacks } = await useAsyncData<Feedback[]>(
    () => `feedbacks-${route.params.slug}`,
    () => ProjectService.getFeedbacks(route.params.slug as string)
)

const averageRating = computed(() => {
    if (!feedbacks.value || feedbacks.value.length === 0) return 0

    const total = feedbacks.value.reduce((sum, f) => sum + f.note, 0)
    return total / feedbacks.value.length
})

const roundedAverage = computed(() => {
  return Math.round(averageRating.value * 10) / 10
})

useHead(() => ({
    title: `Projet ${project.value?.name}`
}))
</script>