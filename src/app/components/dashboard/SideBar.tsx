'use client'

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Dumbbell, FileText, LayoutDashboard, LogOut, Settings, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import React from 'react'

const SideBar = () => {
    const pathName =  usePathname();
    const navItems = [
        {icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard'},
        {icon: ShoppingBag, label: 'Products', href: '/dashboard/products'},
        {icon: FileText, label: 'Orders', href: '/dashboard/orders'},
        {icon: Settings, label: 'Settings', href: '/dashboard/settings'}, // can exclude
    ];

  return (
    <>
        <div className='flex flex-col h-full bg-gray-900 text-white w-64'>
            <div className='p-4'>
                <Dumbbell className='h-8 w-8 text-white' />
            </div>
            <nav className='flex-1'>
                <ul className='space-y-2 p-4'>
                    {navItems.map((item) => (
                        <li key={item.href}>
                            <Link href={item.href} passHref>
                                <Button
                                variant="ghost"
                                className={cn(
                                    "w-full justify-start",
                                    pathName === item.href && "bg-gray-800"
                                )}
                                >
                                <item.icon className='"mr-2 h-4 w-4' />
                                {item.label}
                                </Button>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    </>
  )
}

export default SideBar;