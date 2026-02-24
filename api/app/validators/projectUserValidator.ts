import vine from "@vinejs/vine";
import { RoleEnum } from "../enums/roleEnum.js";

export const createProjectUserValidator = vine.compile(
    vine.object({
        userId: vine
            .string(),

        projectId: vine
            .string(),

        role: vine
            .enum(RoleEnum),
    })
)

export const updateProjectUserValidator = vine.compile(
    vine.object({
        userId: vine
            .string()
            .optional(),

        projectId: vine
            .string()
            .optional(),

        role: vine
            .enum(RoleEnum)
            .optional(),
    })
)