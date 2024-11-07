import {z} from "zod";


//validating if the user is accepting messages or not
export const AcceptMessageSchema = z.object({
    acceptMessages: z.boolean(),
})