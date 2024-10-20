'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import {User} from '@/app/types/user.types';

const AdminLogin = () => {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const {loading, error, login} = useAuth();

    const router = useRouter();

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        try {
            //gotcha moment
            const user: any = await login({email, password, role: "ADMIN"});
            if(user.role === "ADMIN"){
                router.push("/admin/dashboard")
            } else {
                throw new Error("Unauthorized Admin");
            }
        } catch (error: any) {
            console.log("Login failed: ", error);
        }
    }

  return (
    <>
        <div className='flex items-center justify-center min-h-screen bg-gray-900'>
            <Card className='w-[350px]'>
                <CardHeader>
                    <CardTitle>Admin Login</CardTitle>
                    <CardDescription>Enter your credentials to access admin dashboard</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className='grid w-full items-center gap-4'>
                            <div className='flex flex-col space-y-1.5'>
                                <Label htmlFor='email'>Email</Label>
                                <Input 
                                type='email'
                                id='email'
                                name='email'
                                placeholder='Enter your email'
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className='flex flex-col space-y-1.5'>
                                <Label htmlFor='password'>Password</Label>
                                <Input
                                type='password'
                                id='password'
                                name='password'
                                placeholder='Enter your password'
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className=' flex flex-col'>
                    <Button
                    className='w-full'
                    disabled={loading}
                    onClick={handleSubmit}
                    >
                        {loading ? "Logging in....": "Login"}
                    </Button>
                    {error && (
                        <Alert variant="destructive" className='mt-4'>
                            <AlertCircle  className='h-4 w-4'/>
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}
                </CardFooter>
            </Card>
        </div>
    </>
  )
}

export default AdminLogin