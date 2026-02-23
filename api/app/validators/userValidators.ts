import vine from "@vinejs/vine";

export const createUserValidator = vine.compile(
    vine.object({
        firstname: vine
            .string(),

        lastname: vine
            .string(),

        email: vine
            .string()
            .email(),

        password: vine
            .string()
            .minLength(8)
            .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
    })
)

export const updateUserValidator = vine.compile(
    vine.object({
        firstname: vine
            .string()
            .optional(),

        lastname: vine
            .string()
            .optional(),

        email: vine
            .string()
            .email()
            .optional(),

        password: vine
            .string()
            .minLength(8)
            .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
            .optional(),
    })
)