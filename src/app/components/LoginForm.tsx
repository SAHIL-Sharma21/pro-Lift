'use client'


import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from "@/components/ui/label"
import {Input} from '@/components/ui/input'
import {Button} from '@/components/ui/button'
import React, { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import GoogleLoginButton from '@/app/components/GoogleLoginButton';
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const LoginForm = () => {
    const {login, loading, error} = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        try {
            login({email, password});
            router.push("/products");
            //we can also push user to his cart or checkout page
        } catch (error: any) {
            console.error("Login Failed: ", error)
        }
    }

    if(error) return <div>{error}</div>

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
                            required
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
                            required
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
                >
                    {loading ? "Logging in....": "Sign In"}
                </Button>
                <div className='w-full'>
                    <GoogleLoginButton />
                </div>
                <p className='mt-4 text-sm text-center'>
                    Don&apos;t have an account?{' '}
                    <Link href="/auth/register" className='text-blue-500 hover:underline"'>Sign up</Link>
                </p>
            </CardFooter>
        </Card>
    </>
  )
}

export default LoginForm