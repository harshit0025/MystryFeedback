import {z} from "zod";

//checking if the verification code is of 6 digits or not
export const verifySchema = z.object({
    code: z.string().length(6, 'Verification Code must be of 6 digits'),
})
