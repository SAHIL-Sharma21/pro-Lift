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
import { AlertCircle } from "lucide-react";
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

  const { loading, error, register } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register({ firstName, lastName, email, password, phoneNumber, role });
      router.push(role === "ADMIN" ? "/auth/admin/login": "/auth/login");
    } catch (error: any) {
      console.log("Registration failed: ", error); // can show notification or some ui components
    } finally {
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setRole("CUSTOMER");
      setPhoneNumber("");
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Create an Account</CardTitle>
            <CardDescription>Enter your details to register</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid w-full items-center gap-4">
                <div className='flex flex-col space-y-1.5"'>
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
              </div>
              <div className='flex flex-col space-y-1.5"'>
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
              <div className='flex flex-col space-y-1.5"'>
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
              <div className='flex flex-col space-y-1.5"'>
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <PasswordStrengthIndicator password={password} />
              </div>
              <div className='flex flex-col space-y-1.5"'>
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  type="number"
                  id="phoneNumber"
                  placeholder="Enter your mobile number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </div>
              {/* defualt role is cutomer when user register  */}
              <Input type="hidden" value={role} name="role" id="role"  />
            </form>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button
              className="w-full"
              disabled={loading}
              type="submit"
              onClick={handleSubmit}
            >
              {loading ? "Registering..." : "Register"}
            </Button>
            {error && (
              <Alert variant="destructive" className="mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <p className="mt-4 text-sm text-center">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-500 hover:underline">
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
