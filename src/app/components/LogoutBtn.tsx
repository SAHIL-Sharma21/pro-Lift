'use client'

import React from 'react'
import {Button} from '@/components/ui/button';
import { useAuth } from '../hooks/useAuth';
import { Loader2, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

const LogoutBtn = () => {

    const {loading, logout} = useAuth();
    const router = useRouter();

    const handleLogout = async() => {
        try {
            await logout();
            router.push("/auth/login")
        } catch (error: any) {
            console.error("Error logging out user: ", error)
        }
    }

  return (
    <Button
    variant="outline"
    className='flex items-center space-x-2 hover:bg-red-100 hover:text-red-600 transition-colors'
    onClick={handleLogout}
    >
        {loading ? <Loader2 className='mr-2 h-4 w-4 animate-spin' /> : (
            <>
                <LogOut size={18} />
                <span>Logout</span>
            </>
        )}
    </Button>
  )
}

export default LogoutBtn;