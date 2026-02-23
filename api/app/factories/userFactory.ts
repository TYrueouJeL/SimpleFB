import User from "#models/user"
import { faker } from "@faker-js/faker"

type UserType = {
    firstname?: string
    lastname?: string
    email?: string
    password?: string
}

export class UserFactory {
    static async create(data: UserType = {}) {
        return User.create({
            firstname: data.firstname || faker.person.firstName(),
            lastname: data.lastname || faker.person.lastName(),
            email: data.email || faker.internet.email(),
            password: data.password || faker.internet.password()
        })
    }

    static async createMany(count: number) {
        const users = []
        for (let i = 0; i < count; i++) {
            users.push(await this.create())
        }
        return users
    }
}