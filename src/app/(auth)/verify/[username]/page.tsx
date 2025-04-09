'use client'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { verifySchema } from '@/schemas/verifySchema';
import { ApiResponse } from '@/types/ApiResponse';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import axios, { AxiosError } from 'axios';
import { useParams, useRouter } from 'next/navigation'
import { Input } from "@/components/ui/input"
import React from 'react'
import { useForm } from 'react-hook-form';
import { toast } from "sonner"
import * as z from 'zod';
import { log } from 'console';

function VerifyAccount() {
    const router = useRouter();
    const params = useParams<{ username: string }>();

    const form = useForm<z.infer<typeof verifySchema>>({
        resolver: zodResolver(verifySchema),
        defaultValues:{code: ""},
        shouldUnregister: true,
    })

    const onSubmit = async (data: z.infer<typeof verifySchema>) => {
        // console.log(params);
        
        try {
            console.log("Params: ", params.username);
            console.log("Sending API request with data:", { username: params.username, code: data.code });
            const response = await axios.post<ApiResponse>(`/api/verify-code`, {
                username: params.username,
                code: data.code
            })
            console.log(response);
            
            toast("Success", {
                description: response.data.message
            })
            router.replace(`/sign-in`)
        }
        catch (error) {
            console.error("Errorin signup of user", error);
            const axiosError = error as AxiosError<ApiResponse>;
            let errorMessage = axiosError.response?.data.message;
            toast("SuccErroress", {
                description: errorMessage,
            })
        } finally{
            ;
        }
    }

    return (

        <div className='flex justify-center items-center min-h-screen bg-gray-100'>
            <div className='w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md'>
                <div className='text-center'>
                    <h1 className='text-4xl font-extrabold tracking-tight lg:text-5xl mb-6'>
                        Verify Your Account
                    </h1>
                    <p className='mb-4'>Enter the verification code sent to your email</p>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            name="code"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Verification Code</FormLabel>
                                    <Input {...field} placeholder='code' />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </div>
        </div>

    )
}

export default VerifyAccount
