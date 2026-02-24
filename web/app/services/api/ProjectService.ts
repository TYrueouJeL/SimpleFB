import { useAuthStore } from "~/stores/auth"
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
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }

    static async create(name: string, isPublic: boolean) {
        const { token } = useAuthStore()

        return $fetch<Project>(`${apiUrl}/project`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: {
                name,
                isPublic
            }
        })
    }
}