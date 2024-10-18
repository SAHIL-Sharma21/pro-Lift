'use client'


import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from "@/components/ui/label"
import {Input} from '@/components/ui/input'
import {Button} from '@/components/ui/button'
import React, { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import GoogleLoginButton from '@/app/components/GoogleLoginButton';

const LoginForm = () => {
    const {login} = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        login({email, password});
    }

  return (
    <>
        <Card className='w-[350px]'>
            <CardHeader>
                <CardTitle>Login To Your Account</CardTitle>
                <CardDescription>Enter your crendentials</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <div className='grid w-full items-center gap-4'>
                        <div className='flex flex-col space-y-1.5'>
                            <Label htmlFor='email'>Email</Label>
                            <Input 
                            type='email'
                            id='email'
                            placeholder='Enter your email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className='flex flex-col space-y-1.5'>
                            <Label htmlFor='password'>Password</Label>
                            <Input
                            type='password'
                            id='password'
                            placeholder='Enter your password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className='flex flex-col space-y-2'>
                <Button
                    className='w-full'
                    type='submit'
                    onClick={handleSubmit}
                >Login
                </Button>
                <div className='w-full'>
                    <GoogleLoginButton />
                </div>
            </CardFooter>
        </Card>
    </>
  )
}

export default LoginForm