import vine from "@vinejs/vine";

export const createFeedbackValidator = vine.compile(
    vine.object({
        title: vine
            .string(),

        tagId: vine
            .string(),

        projectId: vine
            .string(),

        userId: vine
            .string()
            .optional()
    })
)

export const updateFeedbackValidator = vine.compile(
    vine.object({
        title: vine
            .string()
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