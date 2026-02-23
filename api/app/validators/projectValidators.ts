import vine from "@vinejs/vine";

export const createProjectValidator = vine.compile(
    vine.object({
        name: vine
            .string(),

        is_public: vine
            .boolean(),
    })
)

export const updateProjectValidator = vine.compile(
    vine.object({
        name: vine
            .string()
            .optional(),

        is_public: vine
            .boolean()
            .optional(),
    })
)