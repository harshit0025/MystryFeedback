import {z} from "zod";


//validating username (identifier) and password
export const signInSchema = z.object({
    identifier: z.string(),//identifier can be either email or username, production m identifier bolte h
    password: z.string(),
})