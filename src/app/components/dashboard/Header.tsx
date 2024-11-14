"use client";

import { useAuth } from "@/app/hooks/useAuth";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, User } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Header = () => {
  const { user, logout, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
      if(!loading && !user || localStorage.getItem("accessToken") === null){
        router.push("/auth/admin/login");
      }
  }, [user, loading, router]);

if(loading){
    return <div>Loading...</div>
}

  return (
    <>
      <header className="bg-gray-800 text-white p-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Admin Dashboard</h2>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-2xl font-semibold leading-none">
                      {user?.firstName || "Not Found"}
                    </p>
                    <p className="text-sm text-red-800 leading-none text-gray">
                      {user?.email || "Not Found"}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <Button
                  onClick={logout}
                  className="w-full font-semibold hover:bg-white hover:border hover:text-red-600"
                  variant="destructive"
                >
                  {loading ? "Logging Out..." : "Logout"}
                </Button>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
