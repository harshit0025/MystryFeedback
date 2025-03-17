import 'next-auth';
import { DefaultSession } from 'next-auth';

//hum apne next-auth wale package me kuch extra properties add kr rhe h
//jo ki humare user ke liye h.  Tabhi hum next-auth mei options.ts mei
//user ko access kr skte h aur uske properties ko use kr skte h.
declare module 'next-auth' {
    interface User{
        _id?: string;
        isVerified?: boolean;
        isAcceptingMessage?: boolean;
        username?: string;
    }

    //session interface bhi redefine krna hoga
    interface Session{
        user: {
            _id?: string;
            isVerified?: boolean;
            isAcceptingMessage?: boolean;
            username?: string;
        } & DefaultSession['user']
    }
}

declare module 'next-auth/jwt'{
    interface JWT{
        _id?: string;
        isVerified?: boolean;
        isAcceptingMessage?: boolean;
        username?: string;
    }
}