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
import { Label } from "@radix-ui/react-label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { AlertCircle, Dumbbell, Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PasswordStrengthIndicator from "@/app/components/PasswordStrengthIndicator";
import { useToast } from "@/hooks/use-toast";

const RegisterUser = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("CUSTOMER");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { loading, error, register } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register({
        firstName,
        lastName,
        email,
        password,
        phoneNumber,
        role,
      });
      toast({
        title: "User Registered Successfully",
        description: "You can now login to your account",
        variant: "default",
      });
      router.push(role === "ADMIN" ? "/auth/admin/login" : "/auth/login");
    } catch (error: any) {
      toast({
        title: "User Registration Failed",
        description:
          error.message || "There was a error registering user, Try Again",
        variant: "destructive",
      });
    } finally {
      resetForm();
    }
  };

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setRole("CUSTOMER");
    setPhoneNumber("");
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Create an Account
          </CardTitle>
          <CardDescription>
            Enter your details to register for our gym e-commerce platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  type="text"
                  id="firstName"
                  placeholder="Enter your first name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  type="text"
                  id="lastName"
                  placeholder="Enter your last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>
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
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={handleShowPassword}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                  <span className="sr-only">
                    {showPassword ? "Hide password" : "Show password"}
                  </span>
                </Button>
              </div>
              <PasswordStrengthIndicator password={password} />
            </div>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                type="tel"
                id="phoneNumber"
                placeholder="Enter your mobile number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>
            <Button className="w-full mt-6" disabled={loading} type="submit">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Registering...
                </>
              ) : (
                "Create Account"
              )}
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
        <CardFooter className="flex flex-row justify-center">
          <p className="text-sm text-center">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-primary hover:underline">
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </>
  );
};

export default RegisterUser;
