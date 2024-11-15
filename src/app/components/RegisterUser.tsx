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
import { AlertCircle, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PasswordStrengthIndicator from "@/app/components/PasswordStrengthIndicator";

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
      router.push(role === "ADMIN" ? "/auth/admin/login" : "/auth/login");
    } catch (error: any) {
      console.log("Registration failed: ", error); // can show notification or some ui components
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
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <Card className="w-[450px]">
          <CardHeader>
            <CardTitle>Create an Account</CardTitle>
            <CardDescription>Enter your details to register</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
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
                    type="password"
                    id="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Button type="button" onClick={handleShowPassword}>
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <PasswordStrengthIndicator password={password} />
              </div>
              <div className="flex flex-col space-y-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  type="text" //maybe tere is error in future... watch out for this.
                  id="phoneNumber"
                  placeholder="Enter your mobile number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </div>
              {/* defualt role is cutomer when user register 
              <Input type="hidden" value={role} name="role" id="role"  /> */}
              <Button className="w-full mt-4" disabled={loading} type="submit">
                {loading ? "Registering..." : "Register"}
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
              <Link
                href="/auth/login"
                className="text-blue-500 hover:underline"
              >
                Login
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default RegisterUser;
