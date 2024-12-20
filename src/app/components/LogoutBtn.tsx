"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "../hooks/useAuth";
import { Loader2, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const LogoutBtn = () => {
  const { loading, logout } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      const response = await logout();
      if (response.meta.requestStatus === "fulfilled") {
        toast({
          title: "Logout Successful",
          description: "You have been logged out successfully.",
          variant: "default",
          className: "bg-green-100 border-green-400 text-green-900",
        });
      } else {
        toast({
          title: "Logout Failed",
          description: "There was an error logging out. Please try again.",
          variant: "destructive",
        });
      }
      router.push("/auth/login");
    } catch (error) {
      toast({
        title: "Logout Failed",
        description: error instanceof Error ? error.message : "There was an error logging out. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Button
      variant="outline"
      className="flex items-center space-x-2 hover:bg-red-100 hover:text-red-600 transition-colors"
      onClick={handleLogout}
    >
      {loading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <>
          <LogOut size={18} />
          <span>Logout</span>
        </>
      )}
    </Button>
  );
};

export default LogoutBtn;
