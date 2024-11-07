import {z} from "zod";


//Validating the message a user can send
export const messageSchema = z.object({
    content: z
        .string()
        .min(10, {message: "Content must be at least 10 characters"})
        .max(300, {message: "Content must be at most 300 characters"}),
})