"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import React, { useState } from "react";

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

export default function ContactPage() {
    const [customerName, setCustomerName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userMessage, setUserMessage] = useState("");
    const {toast} = useToast();


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const data = {
                customerName,
                userEmail,
                userMessage
            }
            console.log("message sent successfully!", data)
            toast({
                title: "Message sent successfully!",
                variant:"default",
                className: "bg-green-100 border-green-400 text-green-900"
            });
        } catch (error:any) {
            toast({
                title: "Message not sent successfully",
                description: error.message || "Error sending message",
                variant: "destructive"
            });
        } finally {
            setCustomerName("");
            setUserEmail("");
            setUserMessage("");
        }
    }

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
              Contact Us
            </h1>
            <p className="text-2xl text-gray-300">
              We would love to hear from you
            </p>
          </motion.div>
        </header>

        <main className="container mx-auto py-10 px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold text-blue-400">
                    Get in Touch
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Fill out the form below to reach out to us and we'll get
                    back to you as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4"  onSubmit={handleSubmit}>
                    <div className="space-y-2">
                      <Label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-300 mb-1"
                      >
                        Name
                      </Label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        required
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="bg-gray-700 text-gray-100 border-gray-600"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-300 mb-1"
                      >
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="johnDoe@example.com"
                        required
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        className="bg-gray-700 text-gray-100 border-gray-600"
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-300 mb-1"
                      >
                        Message
                      </Label>
                      <Textarea
                        id="message"
                        placeholder="Your message"
                        required
                        value={userMessage}
                        onChange={(e) => setUserMessage(e.target.value)}
                        className="bg-gray-700 text-gray-100 border-gray-600"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Submit
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold text-blue-400">
                    Contact Information
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    You can also reach us using the following contact details.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <MapPin className="text-blue-400" />
                    <span className="text-gray-300">
                      123 Fitness Street, Gym city, 12345
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="text-blue-400" />
                    <span className="text-gray-300">+91-0123456789</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="text-blue-400" />
                    <span className="text-gray-300">info@prolifts.com</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700 mt-6">
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold text-blue-400">
                    Business Hours
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-300">
                    <li>Monday - Friday: 9:00 AM - 6:00 PM</li>
                    <li>Saturday: 10:00 AM - 4:00 PM</li>
                    <li>Sunday: Closed</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </main>
      </div>
    </>
  );
}
