import {Message} from "@/models/User";

export interface ApiResponse{
    success: boolean;
    message: string;
    isAcceptingMessages?: boolean; //optional, because we don't need it during signup
    messages?: Array<Message> //optional
}
