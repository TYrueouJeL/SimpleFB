import vine from "@vinejs/vine";

export const createFeedbackValidator = vine.compile(
    vine.object({
        title: vine
            .string(),

        isOpen: vine
            .boolean(),

        tagId: vine
            .string(),

        projectId: vine
            .string(),

        userId: vine
            .string()
    })
)

export const updateFeedbackValidator = vine.compile(
    vine.object({
        title: vine
            .string()
            .optional(),

        isOpen: vine
            .boolean()
            .optional(),

        tagId: vine
            .string()
            .optional(),

        projectId: vine
            .string()
            .optional(),

        userId: vine
            .string()
            .optional()
    })
)