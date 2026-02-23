import vine from "@vinejs/vine";

export const createProjectValidator = vine.compile(
    vine.object({
        name: vine
            .string(),

        isPublic: vine
            .boolean(),
    })
)

export const updateProjectValidator = vine.compile(
    vine.object({
        name: vine
            .string()
            .optional(),

        isPublic: vine
            .boolean()
            .optional(),
    })
)