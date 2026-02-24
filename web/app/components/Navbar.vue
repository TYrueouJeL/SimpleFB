<template>
    <aside
        class="fixed top-2 left-2 h-[calc(100vh-1rem)] w-64
            transition-transform duration-300 z-50
            bg-slate-800 rounded-xl"
    >
        <div class="p-6 text-2xl font-bold text-center">
            <NuxtLink
                to="/"
                class="text-gray-100 hover:text-gray-400 transition duration-300"
            >
                Projet 3
            </NuxtLink>
        </div>

        <nav class="flex flex-col gap-2 p-6">

            <NuxtLink
                to="/dashboard"
                class="inline-flex items-center gap-2 px-4 py-2 rounded
                    text-gray-100 hover:bg-gray-600 transition duration-200"
                active-class="bg-gray-700 text-teal-400"
            >
                <Icon name="mdi:view-dashboard" /> Dashboard
            </NuxtLink>

            <div>
                <NuxtLink
                to="/project"
                class="inline-flex items-center gap-2 w-full block px-4 py-2 rounded
                        transition duration-200"
                :class="isProjectSectionActive ? 'bg-gray-700 text-teal-400' : 'text-gray-100 hover:bg-gray-600'"
                >
                    <Icon name="mdi:folder-outline" /> Projets
                </NuxtLink>

                <ul>
                    <li
                        v-for="(project, index) in projectsStore.projectsList"
                        :key="project.slug"
                    >
                        <NuxtLink
                        :to="`/project/${project.slug}`"
                        class="block px-4 py-1.5 mx-4 text-sm rounded transition duration-200"
                        :class="activeProjectSlug === project.slug
                                    ? 'bg-gray-700 text-teal-400'
                                    : 'text-gray-100 hover:bg-gray-600'"
                        @click="projectsStore.switchProject(project.slug)"
                        >
                        {{ project.name }}
                        </NuxtLink>
                    </li>
                </ul>
            </div>

        </nav>
    </aside>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

const projectsStore = useProjectStore()
const route = useRoute()

// Section "Projets" active
const isProjectSectionActive = computed(() => route.path.startsWith('/project'))

// Projet actif (pour sous-liens)
const activeProjectSlug = computed(() => {
    const segments = route.path.split('/')
    return segments[2] || null
})

// Fetch projects si vide
onMounted(() => {
    if (projectsStore.projectsList.length === 0) {
        projectsStore.fetchAll()
    }
})
</script>