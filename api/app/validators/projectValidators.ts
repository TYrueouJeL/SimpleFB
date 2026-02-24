import vine from "@vinejs/vine";

export const createProjectValidator = vine.compile(
    vine.object({
        name: vine
            .string()
            .regex(/\S/),

        isPublic: vine
            .boolean(),
    })
)

export const updateProjectValidator = vine.compile(
    vine.object({
        name: vine
            .string()
            .regex(/\S/)
            .optional(),

        isPublic: vine
            .boolean()
            .optional(),
    })
)