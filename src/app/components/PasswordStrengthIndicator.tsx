"use client";

import React from "react";
import { Progress } from "@/components/ui/progress";

interface PasswordStrengthIndicatorProps {
  password: string;
}

const PasswordStrengthIndicator = ({
  password,
}: PasswordStrengthIndicatorProps) => {
  const getPasswordStrength = (password: string): number => {
    let strength = 0;
    if (password.length > 0) strength += 25;
    if (password.length >= 6) strength += 25;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength += 25;
    if (password.match(/[0-9]/)) strength += 25;
    return strength;
  };

  const strength = getPasswordStrength(password);

  if (password.length === 0) return null;

  return (
    <>
      <div className="mt-2">
        <Progress value={strength} className="w-full" />
        <p className="text-sm mt-1">
          Strength:{" "}
          {strength === 100 ? "Strong" : strength > 50 ? "Medium" : "Weak"}
        </p>
      </div>
    </>
  );
};

export default PasswordStrengthIndicator;
