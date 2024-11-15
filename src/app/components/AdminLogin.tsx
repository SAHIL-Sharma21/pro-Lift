"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const AdminLogin = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { loading, error, login } = useAuth();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user: any = await login({ email, password });
      if (user.payload.user.role === "ADMIN") {
        router.push("/dashboard");
      } else {
        //can show us toast notification
        throw new Error("Unauthorized Admin");
      }
    } catch (error: any) {
      console.log("Login failed: ", error);
    } finally {
      setEmail("");
      setPassword("");
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Admin Login</CardTitle>
            <CardDescription>
              Enter your credentials to access admin dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="flex justify-between">
                    <Input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      placeholder="Enter your password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button type="button" onClick={handleShowPassword}>
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>
              <Button className="w-full mt-4" type="submit" disabled={loading}>
                {loading ? "Logging in...." : "Login"}
              </Button>
              {error && (
                <Alert variant="destructive" className="mt-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </form>
          </CardContent>
          <CardFooter className=" flex flex-row  justify-center">
            {"Don't have an account? "}
            <Link
              href="/auth/admin/register"
              className="underline text-blue-500"
            >
              Signup
            </Link>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default AdminLogin;
