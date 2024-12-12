'use client'

import Header from "@/app/components/dashboard/Header";
import SideBar from "@/app/components/dashboard/SideBar"
import { useAuth } from "@/app/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DahboardLayout({children}:{children: React.ReactNode}) {
    const {user, loading} = useAuth();
    const router = useRouter();

    useEffect(() => {
        if(!loading && (!user || !localStorage.getItem("accessToken"))){
            router.push("/auth/admin/login");
        }
    }, [user, loading, router]);


    if(loading){
        return <div className="flex items-center justify-center h-screen">Loading...</div>
    }

    return(
        <div className="flex h-screen overflow-hidden">
            <SideBar />
            <div className="flex flex-col flex-1 overflow-hidden">
                <Header />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-800">
                    <div className="container mx-auto px-6 py-8">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
