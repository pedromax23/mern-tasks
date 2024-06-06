import { z } from 'zod';

export const createTaskSchema = z.object({
    title: z
    .string({
        required_error: "El titulo es requerido",
        invalid_type_error: "El titulo debe ser un texto",
    })
    .min(1)
    .max(100),

    descripccion: z
    .string({
        required_error: "La descripcción es requerida",
        invalid_type_error: "La descripccón debe ser un texto",
    })
    .min(1)
    .max(255)
    .optional()
})

export const updateTaskSchema = z.object({
    title: z
    .string({
        required_error: "El titulo es requerido",
        invalid_type_error: "El titulo debe ser un texto",
    })
    .min(1)
    .max(100)
    .optional(),
    
    descripccion: z
    .string({
        required_error: "La descripcción es requerida",
        invalid_type_error: "La descripccón debe ser un texto",
    })
    .min(1)
    .max(255)
    .optional()
})