import { getServerSession } from "next-auth"; //direct session mil jata h backend se
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { User } from "next-auth";

//POST request for updating isAcceptingMessage flag
export async function POST(request: Request){
    await dbConnect()

    //first we need currently logged in user. And it needs authOptions
    const session = await getServerSession(authOptions)

    const user: User = session?.user as User //ye user humne hi inject kra tha session mei

    if(!session || !session.user){
        return Response.json({
            success: false,
            message: "User not authenticated",
        }, { status: 401 })
    }

    const userId = user._id;
    const { acceptMessages } = await request.json();

    try {
        
        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            { isAcceptingMessage: acceptMessages },
            { new: true }
        )
        if(!updatedUser){
            return Response.json({
                success: false,
                message: "Failed to update user status to accept messages",
            }, { status: 401 })
        }

        return Response.json({
            success: false,
            message: "Message acceptance status updated successfullt",
            updatedUser
        }, { status: 200 })

    } catch (error) {
        console.log("Failed to update user status to accept messages")
        return Response.json({
            success: false,
            message: "Failed to update user status to accept messages",
        }, { status: 500 })
    }
    
}

//GET request for fetching the isAcceptingMessage flag to see if user is accepting messages or not
export async function GET(request: Request){
    await dbConnect();

    const session = await getServerSession(authOptions);
    const user: User = session?.user as User //ye user humne hi inject kra tha session mei

    if(!session || !session.user){
        return Response.json({
            success: false,
            message: "User not authenticated",
        }, { status: 401 })
    }

    const userId = user._id;

    try {
        const foundUser = await UserModel.findById(userId);

        if(!foundUser){
            return Response.json({
                success: false,
                message: "User not found",
            }, { status: 404 })
        }

        return Response.json({
            success: true,
            isAcceptingMessages: foundUser.isAcceptingMessage
        }, { status: 200 })
    } catch (error) {
        console.log("Failed to update user status to accept messages")
        return Response.json({
            success: false,
            message: "Error in getting message acceptance state",
        }, { status: 500 }) 
    }

}