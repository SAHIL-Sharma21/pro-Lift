"use client";

import ChangePassword from "@/app/components/ChangePassword";
import { useAddress } from "@/app/hooks/useAddress";
import { useAuth } from "@/app/hooks/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function UserProfile() {
  const { user, loading } = useAuth();
  const { addresses, getAllAdress } = useAddress();
  const router = useRouter();
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

  useEffect(() => {
    getAllAdress();
  }, [getAllAdress]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">User Profile</h1>
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage
                    src={"https://github.com/shadcn.png"}
                    alt={user?.firstName}
                  />
                  <AvatarFallback>{user?.firstName}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-2xl font-semibold">
                    {user?.firstName}
                    {user?.lastName}
                  </h2>
                  <p className="text-zinc-400">Email: {user?.email}</p>
                </div>
              </div>
              <Separator />
              <div>
                <p className="text-zinc-400">You are: {user?.role}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>My Address</CardTitle>
            </CardHeader>
            <CardContent>
              {addresses && addresses.length > 0 ? (
                <>
                  <div className="space-y-4">
                    {addresses.map((address) => (
                      <div
                        key={address.id}
                        className="flex items-center space-x-4 p-4 bg-zinc-700 rounded-lg"
                      >
                        <MapPin className="h-5 w-5 mt-1  text-red-500" />
                        <div>
                          <p className="text-white">
                            {address.AddressLine1}, {address.city},{" "}
                            {address.state}, {address.country}{" "}
                            {address.postalCode}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <p>No address found. Please add one.</p>
                </>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => setIsChangePasswordOpen(true)}
              >
                Change Password
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Notification Preferences
              </Button>
              <Button
                variant="destructive"
                className="w-full justify-start text-white hover:bg-red-600"
              >
                Delete Account
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Order History</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-zinc-400">
                Your recent orders will appear here.
              </p>
              <Button
                className="mt-4"
                onClick={() => router.push("/users/orders")}
              >
                View All Orders
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      <ChangePassword
        isOpen={isChangePasswordOpen}
        onClose={() => setIsChangePasswordOpen(false)}
      />
    </>
  );
}

export default UserProfile;
