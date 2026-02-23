export interface UserDTO {
    id: string
    firstname: string
    lastname: string
    email: string
    password: string
}

export interface CreateUserDTO {
    firstname: string
    lastname: string
    email: string
    password: string
}

export interface UpdateUserDTO {
    firstname?: string
    lastname?: string
    email?: string
    password?: string
}