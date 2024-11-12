'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React, { useState } from 'react'
import { useAuth } from '../hooks/useAuth';
import { useRouter } from 'next/navigation';
import PasswordStrengthIndicator from './PasswordStrengthIndicator';


const AdminRegister = () => {
  const [firstName, setFirstName] = useState<string>("");  
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState("ADMIN");
  const [phoneNumber, setPhoneNumber] = useState("");

  const {loading, error, admin} = useAuth();
  const router = useRouter();

  const handleRegisterAdmin = async(e: React.FormEvent) => {
    e.preventDefault();
    try {
        const data = await admin({firstName, lastName, email, password, role, phoneNumber});
        console.log(data);
        router.push("/auth/admin/login"); //pusing to admin login page.

    } catch (error: any) {
      console.error("Register admin failed: ", error.message);
    } finally {
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setRole("ADMIN");
      setPhoneNumber("");
    }
  };

  if(error) return <h2>Error: {error}</h2>;

  return (
    <>
      <div className='flex items-center justify-center min-h-screen bg-gray-900'>
        <Card className='w-[450px]'>
          <CardHeader>
              <CardTitle>Admin Register</CardTitle>
              <CardDescription>Enter details to register as Admin</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRegisterAdmin} className='space-y-4'>
              <div className='flex flex-col space-y-2'>
                <Label htmlFor='firstName'>First Name</Label>
                <Input 
                type='text'
                id='firstName'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder='Enter your first name'
                required
                />
              </div>
              <div className='flex flex-col space-y-2'>
                <Label htmlFor='lastName'>Last Name</Label>
                <Input 
                type='text'
                id='lastName'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder='Enter your last name'
                />
              </div>
              <div className='flex flex-col space-y-2'>
                <Label htmlFor='email'>Email</Label>
                <Input 
                type='email'
                id='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Enter your email'
                required
                />
              </div>
              <div className='flex flex-col space-y-2'>
                <Label htmlFor='password'>Password</Label>
                <Input 
                type='password'
                id='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Enter your password'
                required
                />
                <PasswordStrengthIndicator password={password}/>
              </div>
              <div className='flex flex-col space-y-2'>
                <Label htmlFor='role'>Role</Label>
                <Input 
                type='text'
                id='role'
                value={role}
                disabled
                onChange={(e) => setPassword(e.target.value)}
                required
                />
              </div>
              <div className='flex flex-col space-y-2'>
                <Label htmlFor='phoneNumber'>Phone Number</Label>
                <Input 
                type='text'
                id='phoneNumber'
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder='Enter your Phone number'
                required
                />
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <Button
            className='w-full'
            type='submit'
            variant="default"
            onClick={handleRegisterAdmin}
            disabled={loading}
            >
              {loading ? "Creating Account...." : "Create Account"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  )
}

export default AdminRegister;