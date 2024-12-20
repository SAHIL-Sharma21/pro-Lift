"use client";

import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ChangePassword = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const { loading, passwordChange } = useAuth();
  const { toast } = useToast();

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await passwordChange({ oldPassword, newPassword });
      if (response.meta.requestStatus === "fulfilled") {
        toast({
          title: "Password Changed Successfully",
          description: "Your password has been changed successfully.",
          variant: "default",
        });
      } else {
        toast({
          title: "Password Change Failed",
          description:
            "There was an error changing your password. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Password Change Failed",
        description:
          error instanceof Error ? error.message :
          "There was an error changing your password. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Loading...
      </div>
    );
  }

  return (
    <>
      <Dialog open={isOpen as boolean} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
            <DialogDescription>
              Enter you current password and new password to update your
              account.
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={handlePasswordChange}
            className="flex flex-col gap-4 mt-1 space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="oldPassword">Old Password</Label>
              <Input
                type="password"
                id="oldPassword"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
                placeholder="Enter your old password"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                placeholder="Enter your new password"
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={loading}
              variant="default"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Changing password...
                </>
              ) : (
                <>
                  <span>Change Password</span>
                </>
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ChangePassword;
