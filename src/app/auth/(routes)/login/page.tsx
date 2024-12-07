"use client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import LoginForm from "@/app/components/LoginForm";

export default function Login() {
  return (
    <GoogleOAuthProvider
      clientId={`${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}`}
    >
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
        <div className="w-full max-w-md">
          <LoginForm />
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}
