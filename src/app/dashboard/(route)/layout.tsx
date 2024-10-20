'use client'

export default function DahboardLayout({children}:{children: React.ReactNode}) {
    return(
        <div className="flex h-screen overflow-hidden">
            {/* side bar component  */}
            <div className="flex flex-col flex-1 overflow-hidden">
                {/* header component  */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-950">
                    <div className="container mx-auto px-6 py-8">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
