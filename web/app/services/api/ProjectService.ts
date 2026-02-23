import { useAuthStore } from "~/store/auth"
import type { Project } from "~/types/Project"

const apiUrl = import.meta.env.VITE_API_URL

export default class ProjectService {
    static async getAll(): Promise<Project[]> {
        const { token } = useAuthStore()

        return $fetch<Project[]>(`${apiUrl}/project`, {
            method:'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }

    static async getBySlug(slug: string): Promise<Project> {
        const { token } = useAuthStore()

        return $fetch<Project>(`${apiUrl}/project/${slug}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }
}