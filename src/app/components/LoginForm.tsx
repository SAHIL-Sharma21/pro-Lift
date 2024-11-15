"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import GoogleLoginButton from "@/app/components/GoogleLoginButton";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

const LoginForm = () => {
  const { login, loading, error } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      login({ email, password });

      //TODO: here also on basis of response then move to cart or checkout
      router.push("/products");
      //we can also push user to his cart or checkout page
    } catch (error: any) {
      console.error("Login Failed: ", error);
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  if (error) return <div>{error}</div>;

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Login To Your Account</CardTitle>
            <CardDescription>Enter your crendentials</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="flex justify-between">
                  <Input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Button type="button" onClick={handleShowPassword}>
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>
              <Button
                className="w-full mt-4"
                type="submit"
                onClick={handleSubmit}
              >
                {loading ? "Logging in...." : "Sign In"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <div className="w-full">
              <GoogleLoginButton />
            </div>
            <p className="text-sm text-center">
              Don&apos;t have an account?{" "}
              <Link
                href="/auth/register"
                className='text-blue-500 hover:underline"'
              >
                Sign up
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default LoginForm;
