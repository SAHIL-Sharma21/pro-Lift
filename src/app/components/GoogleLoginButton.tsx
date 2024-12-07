"use client";

import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../hooks/useAuth";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const GoogleLoginButton = () => {
  const router = useRouter();
  const { toast } = useToast();
  const { googleLogin } = useAuth();

  const handleGoogleLoginSuccess = async (credentialResponse: any) => {
    try {
      await googleLogin(credentialResponse.credential);
      toast({
        title: "Login Successful",
        description: "You are now logged in with google",
        variant: "default",
      });
      router.push("/products");
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "There was an error logging in with google",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <GoogleLogin
        onSuccess={handleGoogleLoginSuccess}
        onError={() => {
          toast({
            title: "Google Login Failed",
            description: "There was an error logging in with google",
            variant: "destructive",
          });
        }}
        useOneTap
        cancel_on_tap_outside
        theme="outline"
        shape="circle"
        size="large"
        text="continue_with"
        locale="en"
      />
    </>
  );
};

export default GoogleLoginButton;
