'use client'

import React from 'react'
import {GoogleLogin} from '@react-oauth/google'
import { useAuth } from '../hooks/useAuth';
import { useRouter } from 'next/navigation';

const GoogleLoginButton = () => {
    const router = useRouter();

    const {googleLogin} = useAuth();
    const handleGoogleLoginSuccess = (credentialResponse: any) => {
        googleLogin(credentialResponse.credential); //error may come here
        router.push("/products");
    }

  return (
    <>
        <GoogleLogin
        onSuccess={handleGoogleLoginSuccess}
        onError={() => console.log('error')}//can show differen page here
        />
    </>
  )
}

export default GoogleLoginButton