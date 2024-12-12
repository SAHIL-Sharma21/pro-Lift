"use client";

import { useAuth } from "@/app/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

const Header = () => {
  const { logout } = useAuth();

  return (
    <header className="bg-gray-800 text-white shadow-md sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex justify-between items-center py-3 md:py-4">
          <h2 className="text-xl md:text-2xl font-bold">Admin Dashboard</h2>
          <Button
            onClick={logout}
            variant="ghost"
            className="flex items-center text-gray-300 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 transition-colors duration-200"
          >
            <LogOut className="mr-2 h-5 w-5" />
            <span>Logout</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
