'use client'
import {GoogleOAuthProvider} from '@react-oauth/google'
import LoginForm from '@/app/components/LoginForm';


export default function Login(){
    return (
        <GoogleOAuthProvider clientId={`${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}`}>
            <LoginForm /> 
        </GoogleOAuthProvider>
    );
}