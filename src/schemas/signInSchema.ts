import {z} from "zod";


//validating username (identifier) and password
export const signInSchema = z.object({
    identifier: z.string(),
    password: z.string(),
})