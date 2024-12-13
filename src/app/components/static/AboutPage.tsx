"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const fadeIn = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

const cardContent = [
  {
    title: "Premium Quality",
    description:
      "We source only the best equipment from trusted manufacturers, ensuring durability and performance.",
  },
  {
    title: "Expert Advice",
    description:
      "Our team of fitness experts provides personalized guidance and recommendations to help you achieve your fitness goals.",
  },
  {
    title: "Competitive Pricing",
    description:
      "We offer the best value for your investment, with regular deals and discounts on top brands.",
  },
];

export default function AboutContent() {
  return (
    <>
      <div className="min-h-screen bg-gray-900 text-gray-100">
        <header className="py-12">
          <motion.div
            className="container mx-auto text-center px-4"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl font-bold mb-3 text-blue-400">
              About Pro Lifts
            </h1>
            <p className="text-2xl text-gray-300">
              Your ultimate gym equipment store
            </p>
          </motion.div>
        </header>
        <main className="container mx-auto py-10 px-4">
          <motion.section
            className="mb-16"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold mb-6 text-blue-400">
              Our Mission
            </h2>
            <p className="text-lg mb-4 text-gray-300">
              At Pro Lifts, we're dedicated to empowering fitness enthusiasts
              and professionals with top-quality gym equipment. Our mission is
              to make premium fitness gear accessible to everyone, from home gym
              heroes to commercial facility owners.
            </p>
            <p className="text-lg text-gray-300">
              We believe that the right equipment can transform your workout
              experience and help you achieve your fitness goals faster and more
              efficiently.
            </p>
          </motion.section>
          <motion.section
            className="mb-16"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-3xl font-bold mb-6 text-blue-400">
              Why Choose Pro Lifts
            </h2>
            {cardContent.length > 0 && (
              <div className="grid md:grid-cols-3 gap-6">
                {cardContent.map((content, index) => (
                  <Card
                    key={index}
                    className="bg-gray-800 border-gray-700 flex flex-col h-full"
                  >
                    <CardHeader>
                      <CardTitle className="text-2xl text-blue-400">
                        {content.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <CardDescription className="text-gray-300 text-base">
                        {content.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </motion.section>
          <motion.section
            className="mb-16"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-6 text-blue-400">Our Story</h2>
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2">
                <p className="text-lg mb-4 text-gray-300">
                  Founded in 2010 by a group of passionate fitness enthusiasts,
                  Pro Lifts started as a small local gym equipment supplier.
                  Over the years, we've grown into a nationwide e-commerce
                  platform, serving thousands of satisfied customers.
                </p>
                <p className="text-lg text-gray-300">
                  Our journey has been fueled by our commitment to quality,
                  customer satisfaction, and the belief that everyone deserves
                  access to professional-grade fitness equipment.
                </p>
              </div>
              <div className="md:w-1/2">
                <Image
                  src={`https://images.unsplash.com/photo-1637666218229-1fe0a9419267?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`}
                  alt="Pro Lifts gym equipment"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </motion.section>
          <motion.section
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <h2 className="text-3xl font-bold mb-6 text-blue-400">
              Join the Pro Lifts Community
            </h2>
            <p className="text-lg mb-6 text-gray-300">
              Whether you're setting up a home gym, upgrading your commercial
              facility, or looking for the perfect addition to your workout
              routine, Pro Lifts is here to support your fitness journey. Join
              our community of fitness enthusiasts and experience the Pro Lifts
              difference today!
            </p>
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Link href="/products">Shop Now</Link>
            </Button>
          </motion.section>
        </main>
      </div>
    </>
  );
}
