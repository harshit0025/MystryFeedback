import { Message } from "@/models/User";

export interface ApiResponse{
    success: boolean;
    message: string;
    isAcceptingMessage?: boolean; //optional, because we don't need it during responses like signup
    messages?: Array<Message> //optional
}
