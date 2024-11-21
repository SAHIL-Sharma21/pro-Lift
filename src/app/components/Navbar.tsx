'use client'

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { LogOut, MenuSquare, ShoppingBag, ShoppingCart, User, UserCircle2 } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";



interface MobileLinkProps extends React.PropsWithChildren{
    href: string;
    onOpenChange?: (open: boolean) => void;
    className?: string;
}

function MobileLink({href, onOpenChange, className, children}: MobileLinkProps){
    return (
        <Link
        href={href}
        onClick={() => onOpenChange?.(false)}
        className={className}
        >
        {children}
        </Link>
    );
}


export default function Navbar(){

    const [isOpen, setIsOpen] = useState(false);
    const {user, loading, logout} = useAuth();

    const navItems = [
        {title: "Home", path: "/"},
        {title: "Products", path: "/products"},
        {title: "About", path: "/about"},
        {title: "Contact", path: "/contact"},
    ];


    return(
        <>
            <header className="sticky top-0 z-50 w-full border-b border-zinc-700 bg-zinc-900 text-zinc-100">
            <div className="container mx-auto flex h-16 items-center justify-between">
                <Link href="/" className="flex items-center space-x-2">
                    <span className="font-bold text-2xl">Pro Lifts</span>
                </Link>
                <nav className="hidden md:flex items-center space-x-6 text-base font-medium">
                    {navItems.map((item, index) => (
                        <Link
                        href={item.path}
                        key={index}
                        className="transition-colors hover:text-zinc-300"
                        >
                        {item.title}
                        </Link>
                    ))}
                </nav>
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>
                        <Button
                        variant="ghost"
                        className="px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
                        >
                            <MenuSquare className="h-6 w-6"  />
                            <span className="sr-only">Toggle Menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-[300px] bg-zinc-900 text-zinc-100">
                        <MobileLink href="/" className="flex items-center" onOpenChange={setIsOpen}>
                            <span className="font-bold text-xl">Pro Lifts</span>
                        </MobileLink>
                        <div className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
                            <div className="flex flex-col space-y-3">
                                {navItems.map((item, index) => (
                                    <MobileLink key={index} href={item.path} onOpenChange={setIsOpen}>
                                        {item.title}
                                    </MobileLink>
                                ))}
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
                <div className="flex items-center space-x-4">
                    <Button variant="outline" size="icon" className="text-zinc-900 border-none hover:bg-zinc-900 hover:text-white">
                        <ShoppingCart className="h-7 w-7" />
                        <span className="sr-only">Shopping Cart</span>
                    </Button>
                    {loading ? (
                        <div className="w-24 h-6 bg-zinc-800 animate-pulse rounded"></div>
                    ) : user ? (
                        <>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="text-zinc-100">
                                    <UserCircle2 className="mr-1 h-5 w-5" />
                                    <span className="text-base font-semibold">{user.firstName}</span>
                                </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56" align="end">
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <UserCircle2 className="mr-2 h-4 w-4" />
                                    <span>Profile</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <ShoppingBag className="mr-2 h-4 w-4" />
                                    <span>Orders</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={logout} className="text-red-600 focus:text-red-600">
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Log out</span>
                                </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </>
                    ) : (
                        <div className="flex items-center space-x-1.5">
                            <Button variant="ghost" size="sm" className="text-zinc-100 hover:bg-orange-400 hover:text-white" asChild>
                                <Link href="/auth/login">
                                    <span className="text-sm">Login</span> 
                                </Link>
                            </Button>
                            <Button variant="ghost" size="sm" className="text-zinc-100 hover:bg-orange-400 hover:text-white" asChild>
                                <Link href="/auth/register">
                                    <span className="text-sm">Register</span>
                                </Link>
                            </Button>
                        </div>
                    ) }
                </div>
            </div>
        </header>
        </>
    );
}