import { z } from 'zod';

export const createTaskSchema = z.object({
    title: z
    .string({
        required_error: "El titulo es requerido",
        invalid_type_error: "El titulo debe ser un texto",
    })
    .min(1)
    .max(100),

    descripcion: z
    .string({
        required_error: "La descripción es requerida",
        invalid_type_error: "La descripcón debe ser un texto",
    })
    .max(255, {
        message: 'La descripción no puede tener mas de 255 caracteres'
    })
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
    
    descripccon: z
    .string({
        required_error: "La descripción es requerida",
        invalid_type_error: "La descripcón debe ser un texto",
    })
    .max(255, {
        message: 'La descripción no puede tener mas de 255 caracteres'
    })
    .optional()
})