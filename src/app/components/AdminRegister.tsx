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
import { useRouter } from "next/navigation";
import PasswordStrengthIndicator from "./PasswordStrengthIndicator";
import { AlertCircle, Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

const AdminRegister = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState("ADMIN");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { loading, error, admin } = useAuth();
  const router = useRouter();
  const {toast} = useToast();


  const handleRegisterAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await admin({
        firstName,
        lastName,
        email,
        password,
        role,
        phoneNumber,
      });
      if(data.meta.requestStatus === "fulfilled"){
        toast({
          title: "Admin Registered Successfully",
          description: "You can now login to your account",
          variant: "default",
        });
      } else {
        toast({
          title: "Admin Registration Failed",
          description: "There was a error registering admin, Try Again",
          variant: "destructive",
        });
      }
      router.push("/auth/admin/login");
    } catch (error) {
      toast({
        title: "Admin Registration Failed",
        description:
          error instanceof Error ? error.message : "There was a error registering admin, Try Again",
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
    setRole("ADMIN");
    setPhoneNumber("");
  }

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  if (error) return <h2>Error: {error}</h2>;

  return (
    <>
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Admin Register</CardTitle>
            <CardDescription>
              Enter details to register as Admin
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRegisterAdmin} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  type="text"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="font-semibold"
                  placeholder="Enter your first name"
                  required
                />
              </div>
              <div className="flex flex-col space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  type="text"
                  id="lastName"
                  value={lastName}
                  className="font-semibold"
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Enter your last name"
                />
              </div>
              </div>
              <div className="flex flex-col space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  value={email}
                  className="font-semibold"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="flex flex-col space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="font-semibold"
                    placeholder="Enter your password"
                    required
                  />
                  <Button type="button"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  variant="ghost"
                  size="sm"
                  onClick={handleShowPassword}>
                    {showPassword ? (
                      <Eye className="h-4 w-4" />
                    ) : (
                      <EyeOff className="h-4 w-4" />
                    )}
                  <span className="sr-only">
                    {showPassword ? "Hide password" : "Show password"}
                  </span>
                  </Button>
                </div>
                <PasswordStrengthIndicator password={password} />
              </div>
              <div className="flex flex-col space-y-2">
                <Label htmlFor="role">Role</Label>
                <Input
                  type="text"
                  id="role"
                  value={role}
                  disabled
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col space-y-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  type="text"
                  id="phoneNumber"
                  value={phoneNumber}
                  className="font-semibold"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Enter your Phone number"
                  required
                />
              </div>
              <Button
                className="w-full mt-6"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Account...
                  </>
                ) : "Create Account"}
              </Button>
              {error && (
                <Alert className="mt-4" variant="destructive">
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
              <Link href="/auth/admin/login" className="text-primary hover:underline">
                Login
              </Link>
            </p>

          </CardFooter>
        </Card>
    </>
  );
};

export default AdminRegister;
