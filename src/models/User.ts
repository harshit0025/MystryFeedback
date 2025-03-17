import mongoose, {Schema, Document} from "mongoose";


export interface Message extends Document{
    content: string;
    createdAt: Date
}

const MessageSchema: Schema<Message> = new Schema({
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
})

export interface User extends Document{
    username: string;
    email: string;
    password: string;
    verifyCode: string;
    verifyCodeExpiry: Date;
    isVerified: boolean;
    isAcceptingMessage: boolean;
    messages: Message[]
}

const UserSchema: Schema<User> = new Schema({
    username: {
        type: String,
        required: [true, "Username is required"], //For custom message if not true
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        match: [/^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/, 'Please use a valid email address'] //To test if email is valid
    },
    password : {
        type: String,
        required: [true, "Password is required"],
    },
    verifyCode : {
        type: String,
        required: [true, "Verification code is required"],
    },
    verifyCodeExpiry : {
        type: Date,
        required: [true, "Verification code expiry is required"],
    },
    isVerified : {
        type: Boolean,
        default: false,
    },
    isAcceptingMessage : {
        type: Boolean,
        default: true,
    },
    messages: [MessageSchema]
})


//Next.js mei baar baar server run hota hai
//HO sakta h pehle se bana hua ho database, aur nhi bana ho toh naya create krdo
const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", UserSchema)

export default UserModel;