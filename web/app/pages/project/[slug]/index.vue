<template>
    <div>
        <h1 class="text-2xl font-bold mb-4">Projet {{ project?.name }}</h1>
        
        <div class="flex justify-between">
            <NuxtLink to="/project" class="inline-flex items-center gap-2 text-gray-400"><Icon name="mdi:arrow-left"/>Retour</NuxtLink>
            <NuxtLink
            :to="`/project/${project?.slug}/settings`"
            class="group flex items-center justify-center
                    w-10 h-10 rounded-xl
                    border border-gray-200
                    hover:bg-gray-400
                    transition-all duration-200"
            >
            <Icon
                name="mdi:tune-vertical"
                class="text-xl text-gray-500
                    transition-colors duration-200
                    group-hover:text-gray-100"
            />
            </NuxtLink>
        </div>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 my-6
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
        </div>

        <div class=" grid grid-cols-3 gap-2">
            <h2 class="text-xl font-semibold mb-4 col-span-3">Feedbacks</h2>
            <div v-for="feedback in feedbacks" class="border rounded-xl hover:shadow-md transition bg-white p-4">
                <div class="flex justify-between mb-2">
                    <p class="font-semibold">{{ feedback.title }}</p>

                    <p v-if="feedback.isOpen" class="bg-green-200 text-green-800 rounded-xl px-2 text-sm">Ouvert</p>
                    <p v-else class="bg-red-200 text-red-800 rounded-xl px-2 text-sm">Fermé</p>
                </div>
                
                <div class="flex justify-between">
                    <p class="text-sm text-gray-500">Créé le {{ new Date(feedback.createdAt).toLocaleDateString() }} par {{ feedback.user.firstname }} {{ feedback.user.lastname }}</p>

                    <span
                    class="inline-block px-2 py-1 text-xs font-semibold rounded-full"
                    :style="{
                        backgroundColor: feedback.tag.color + '20',
                        color: feedback.tag.color,
                        border: '1px solid ' + feedback.tag.color
                    }"
                    >
                        {{ feedback.tag.name }}
                    </span>
                </div>
            </div>
        </div>

        <div class="flex justify-center mt-6 gap-2">
            <button
                class="px-4 py-2 border rounded hover:bg-gray-200 disabled:opacity-50"
                :disabled="page === 1"
                @click="changePage(page - 1)"
            >
                Précédent
            </button>

            <span class="px-4 py-2">{{ page }} / {{ totalPages }}</span>

            <button
                class="px-4 py-2 border rounded hover:bg-gray-200 disabled:opacity-50"
                :disabled="page === totalPages"
                @click="changePage(page + 1)"
            >
                Suivant
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import auth from '~/middlewares/auth';
import ProjectService from '~/services/api/ProjectService';
import type { Project } from '~/types/Project';

const route = useRoute()
const page = ref(1)
const limit = 9

const { data: project } = await useAsyncData<Project>(
    () => `project-${route.params.slug}`,
    () => ProjectService.getBySlug(route.params.slug as string)
)

const { data: feedbackResponse, refresh } = await useAsyncData(
    () => `feedbacks-${route.params.slug}-${page.value}`,
    () => ProjectService.getFeedbacks(route.params.slug as string, page.value, limit)
)

const feedbacks = computed(() => feedbackResponse.value?.data ?? [])
const totalPages = computed(() => Math.ceil((feedbackResponse.value?.total ?? 0) / limit))

function changePage(newPage: number) {
    if (newPage < 1 || newPage > totalPages.value) return
    page.value = newPage
    refresh()
}

watch(page, () => refresh())

definePageMeta({ middleware: auth })

useHead(() => ({
    title: `${project.value?.name}`
}))
</script>