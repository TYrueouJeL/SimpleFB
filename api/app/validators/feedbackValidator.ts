import vine from "@vinejs/vine";

export const createFeedbackValidator = vine.compile(
    vine.object({
        title: vine
            .string(),

        note: vine
            .number()
            .min(1)
            .max(5),

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

        note: vine
            .number()
            .min(1)
            .max(5)
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