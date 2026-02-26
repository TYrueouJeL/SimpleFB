import { useAuthStore } from "~/stores/auth"
import type { Feedback } from "~/types/Feedback"
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

    static async create(name: string, enableAnonymousFeedback: boolean) {
        const { token } = useAuthStore()

        if (!name || name.trim().length === 0) {
            throw new Error("Le nom du projet ne peut pas être vide ou uniquement constitué d'espaces")
        }

        return $fetch<Project>(`${apiUrl}/project`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: {
                name,
                enableAnonymousFeedback: enableAnonymousFeedback
            }
        })
    }

    static async update(projectSlug: string, name?: string, enableAnonymousFeedback?: boolean) {
        const { token } = useAuthStore()

        if (!name || name.trim().length === 0) {
            throw new Error("Le nom du projet ne peut pas être vide ou uniquement constitué d'espaces")
        }

        const body: Partial<{ name: string, enableAnonymousFeedback: boolean }> = {}

        if (name !== undefined) body.name = name
        if (enableAnonymousFeedback !== undefined) body.enableAnonymousFeedback = enableAnonymousFeedback

        return $fetch<Project>(`${apiUrl}/project/${projectSlug}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`
            },
            body
        })
    }

    static async delete(projectSlug: string) {
        const { token } = useAuthStore()

        return $fetch(`${apiUrl}/project/${projectSlug}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }

    static async getFeedbacks(projectSlug: string, page: number = 1, limit: number = 1, search: string = '') {
        const { token } = useAuthStore()

        return $fetch<{ total: number; page: number; limit: number; data: Feedback[] }>(`${apiUrl}/project/${projectSlug}/feedback`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                page,
                limit,
                search
            }
        })
    }
}