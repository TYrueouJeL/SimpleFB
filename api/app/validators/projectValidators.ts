import vine from "@vinejs/vine";

export const createProjectValidator = vine.compile(
    vine.object({
        name: vine
            .string()
            .regex(/\S/),

        enableAnonymousFeedback: vine
            .boolean(),
    })
)

export const updateProjectValidator = vine.compile(
    vine.object({
        name: vine
            .string()
            .regex(/\S/)
            .optional(),

        enableAnonymousFeedback: vine
            .boolean()
            .optional(),
    })
)