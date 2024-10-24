'use client'

import Header from "@/app/components/dashboard/Header";
import SideBar from "@/app/components/dashboard/SideBar"

export default function DahboardLayout({children}:{children: React.ReactNode}) {
    return(
        <div className="flex h-screen overflow-hidden">
            <SideBar />
            <div className="flex flex-col flex-1 overflow-hidden">
                <Header />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-950">
                    <div className="container mx-auto px-6 py-8">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
