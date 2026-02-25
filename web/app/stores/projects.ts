import { defineStore } from "pinia";
import ProjectService from "~/services/api/ProjectService";
import type { Project } from "~/types/Project";

export const useProjectStore = defineStore('projects', () => {
    const cache = ref<Record<string, Project>>({})
    const currentProjectId = ref<string | null>(null)
    const loading = ref(false)
    const error = ref<string | null>(null)

    const currentProject = computed(() =>
        currentProjectId.value ? cache.value[currentProjectId.value] : null
    )

    const projectsList = computed(() => Object.values(cache.value))

    async function fetchAll() {
        loading.value = true
        try {
            const projects = await ProjectService.getAll()
            projects.forEach(p => cache.value[p.slug] = p)
        } finally {
            loading.value = false
        }
    }

    async function switchProject(slug: string) {
        currentProjectId.value = slug
        if (cache.value[slug]) return

        loading.value = true
        try {
            const project = await ProjectService.getBySlug(slug)
            cache.value[slug] = project
        } catch (e: any) {
            error.value = e.message
        } finally {
            loading.value = false
        }
    }

    function invalidate(slug: string) {
        delete cache.value[slug]
    }

    function reset() {
        cache.value = {}
        currentProjectId.value = null
        loading.value = false
        error.value = null
    }

    return {
        cache,
        currentProject,
        projectsList,
        currentProjectId,
        loading,
        error,
        fetchAll,
        switchProject,
        invalidate,
        reset
    }
})

export type ProjectStore = ReturnType<typeof useProjectStore>