"use client";

import { useState } from "react";
import { useAuth } from "@/app/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export default function SettingsPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const [adminSettings, setAdminSettings] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    password: "",
    confirmPassword: "",
  });

  const [siteSettings, setSiteSettings] = useState({
    siteName: "Pro Lift",
    siteDescription: "Your one-stop shop for gym equipment",
    contactEmail: "contact@prolift.com",
    enableRegistrations: true,
    maintenanceMode: false,
  });

  const handleAdminSettingsChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAdminSettings((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSiteSettingsChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSiteSettings((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleToggleChange = (name: string) => {
    setSiteSettings((prev) => ({
      ...prev,
      [name]: !prev[name as keyof typeof siteSettings],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Here you would typically send this data to your backend
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulating API call
    setLoading(false);
    toast({
      title: "Settings Updated",
      description: "Your changes have been saved successfully.",
    });
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6 text-white">Settings</h1>
      <Tabs defaultValue="admin">
        <TabsList className="mb-4">
          <TabsTrigger value="admin">Admin Settings</TabsTrigger>
          <TabsTrigger value="site">Site Settings</TabsTrigger>
        </TabsList>
        <form onSubmit={handleSubmit}>
          <TabsContent value="admin">
            <Card>
              <CardHeader>
                <CardTitle>Admin Settings</CardTitle>
                <CardDescription>
                  Manage your admin account details here.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={adminSettings.firstName}
                      onChange={handleAdminSettingsChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={adminSettings.lastName}
                      onChange={handleAdminSettingsChange}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={adminSettings.email}
                    onChange={handleAdminSettingsChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">New Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={adminSettings.password}
                    onChange={handleAdminSettingsChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={adminSettings.confirmPassword}
                    onChange={handleAdminSettingsChange}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="site">
            <Card>
              <CardHeader>
                <CardTitle>Site Settings</CardTitle>
                <CardDescription>
                  Manage general site settings here.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input
                    id="siteName"
                    name="siteName"
                    value={siteSettings.siteName}
                    onChange={handleSiteSettingsChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="siteDescription">Site Description</Label>
                  <Textarea
                    id="siteDescription"
                    name="siteDescription"
                    value={siteSettings.siteDescription}
                    onChange={handleSiteSettingsChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Contact Email</Label>
                  <Input
                    id="contactEmail"
                    name="contactEmail"
                    type="email"
                    value={siteSettings.contactEmail}
                    onChange={handleSiteSettingsChange}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="enableRegistrations"
                    checked={siteSettings.enableRegistrations}
                    onCheckedChange={() =>
                      handleToggleChange("enableRegistrations")
                    }
                  />
                  <Label htmlFor="enableRegistrations">
                    Enable User Registrations
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="maintenanceMode"
                    checked={siteSettings.maintenanceMode}
                    onCheckedChange={() =>
                      handleToggleChange("maintenanceMode")
                    }
                  />
                  <Label htmlFor="maintenanceMode">Maintenance Mode</Label>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <CardFooter className="mt-6">
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </CardFooter>
        </form>
      </Tabs>
    </div>
  );
}
