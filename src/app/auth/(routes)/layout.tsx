"use client";

import { Dumbbell } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="hidden lg:flex flex-col justify-center items-center w-1/2 bg-primary p-12">
        <Dumbbell className="h-24 w-24 text-primary-foreground mb-8" />
        <h1 className="text-4xl font-bold text-primary-foreground text-center">
          Welcome to Our Gym E-commerce Platform
        </h1>
        <p className="text-xl text-primary-foreground text-center mt-4">
          Get fit, stay healthy, and shop for the best gym equipment!
        </p>
      </div>
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 p-8">
        {children}
      </div>
    </div>
  );
}
