import AboutContent from "@/app/components/static/AboutPage";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Pro Lifts | Your Ultimate Gym Equipment Destination",
  description:
    "Learn about Pro Lifts, your trusted source for premium gym equipment and fitness accessories. Discover our mission, values, and commitment to your fitness journey.",
};

export default function AboutPage() {
  return (
    <div className="dark:text-white">
      <AboutContent />
    </div>
  );
}
