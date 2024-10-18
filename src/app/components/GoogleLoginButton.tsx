'use client'

import React from 'react'
import {GoogleLogin} from '@react-oauth/google'
import { useAuth } from '../hooks/useAuth'

const GoogleLoginButton = () => {

    const {googleLogin} = useAuth();
    const handleGoogleLoginSuccess = (credentialResponse: any) => {
        googleLogin(credentialResponse.credential); //error may come here
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