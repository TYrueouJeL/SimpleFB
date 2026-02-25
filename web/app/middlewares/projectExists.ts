export default defineNuxtRouteMiddleware(async (to) => {
    const route = useRoute()
    const projectStore: ProjectStore = useProjectStore()
    const slug = to.params.slug as string

    if (!slug) {
        return navigateTo('/project')
    }

    if (!projectStore.cache[slug]) {
        await projectStore.switchProject(slug)
    }

    if (!projectStore.cache[slug]) {
        return navigateTo('/project')
    }
})