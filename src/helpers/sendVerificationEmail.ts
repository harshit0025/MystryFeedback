import {resend} from '@/lib/resend';
import VerificationEmail from '../../emails/VerificationEmail';

import { ApiResponse } from '@/types/ApiResponse';

export async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string,

) : Promise<ApiResponse>{
    try {
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Mystry Message | Verification Code',
            //React Component bhejna padega ki kya display karana hai
            react: VerificationEmail({username, otp: verifyCode})
        })
        return {success: true, message: 'Verification email sent successfully'}

    } catch (emailError) {
        console.error("Error sending verification email", emailError)

        //Promise toh return karna padega na because function ka return type promise hai
        return {success: false, message: 'Failed to send verification email'}
    }
}
