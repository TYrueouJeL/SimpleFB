<template>
    <aside
    class="fixed top-2 left-2 h-[calc(100vh-1rem)] w-64
            transition-transform duration-300 z-50
            bg-gray-900 rounded-xl"
    >
        <div class="p-6 text-2xl font-bold text-center">
            <NuxtLink
            to="/"
            class="hover:text-sky-400 text-gray-100 transtition duration-300"
            active-class="text-sky-400"
            >
                Projet 3
            </NuxtLink>
        </div>

        <nav class="flex flex-col gap-2 p-6">
            <NuxtLink
            to="/dashboard"
            class="inline-flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-400 transition duration-200 hover: text-gray-100"
            active-class="bg-gray-400 "
            >
                <Icon name="mdi:view-dashboard" /> Dashboard
            </NuxtLink>

            <div @mouseenter="isHovered = true" @mouseleave="isHovered = false">
                <NuxtLink
                    to="/project"
                    :class="[
                    'inline-flex items-center gap-2 w-full block px-4 py-2 rounded hover:bg-gray-400 transition duration-200 text-gray-100',
                    isHighlighted ? 'bg-gray-400 ' : ''
                    ]"
                >
                    <Icon name="mdi:folder-outline" /> Projets
                </NuxtLink>

                <ul>
                    <li v-for="(project, index) in projectsStore.projectsList" :key="project.slug">
                        <NuxtLink
                            :to="`/project/${project.slug}`"
                            :class="[
                            'block px-4 py-1.5 mx-4 text-sm transition duration-200 hover: text-gray-100',
                            isHighlighted ? 'bg-gray-400 ' : 'hover:bg-gray-400',
                            index === projectsStore.projectsList.length - 1 ? 'rounded-b mb-2.5' : ''
                            ]"
                            active-class=""
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
const projectsStore = useProjectStore()
const route = useRoute()
const isHovered = ref(false)

const isProjectSection = computed(() =>
    route.path.startsWith('/project')
)

const isHighlighted = computed(() =>
    isProjectSection.value || isHovered.value
)

onMounted(() => {
    if (projectsStore.projectsList.length === 0) {
        projectsStore.fetchAll()
    }
})
</script>