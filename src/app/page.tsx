'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowRight, ShoppingCart, Star, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useProduct } from "./hooks/useProduct";
import { useEffect, useState } from "react";
import { Product } from "./types/products.types";

export default function Home() {
  const { loading: productLoading, getAllProducts, products } = useProduct();
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [email, setEmail] = useState('');

  // Hardcoded testimonials for demonstration
  const testimonials = [
    {
      quote: "GymGear has completely transformed my home workouts. The quality of their equipment is unmatched!",
      name: "Sarah J.",
      title: "Fitness Enthusiast",
      image: "/testimonial-1.jpg" // Replace with actual image path
    },
    {
      quote: "Best investment in my fitness journey. The equipment is durable and feels professional-grade.",
      name: "Mike T.",
      title: "Personal Trainer",
      image: "/testimonial-2.jpg" // Replace with actual image path
    },
    {
      quote: "Incredible customer service and top-notch gym equipment. Highly recommend!",
      name: "Emily R.",
      title: "Crossfit Coach",
      image: "/testimonial-3.jpg" // Replace with actual image path
    }
  ];

  useEffect(() => {
    getAllProducts(1, 4);
  }, [getAllProducts]);

  useEffect(() => {
    if (products.length > 0) {
      setFeaturedProducts(products.slice(0, 4));
    }
  }, [products]);

  const handleNewsletterSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement newsletter signup logic here
    console.log('Signing up with email:', email);
    // Reset email after submission
    setEmail('');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[700px] flex items-center justify-center text-white overflow-hidden">
        <Image
          src="/hero-gym-background.jpg" // Replace with high-quality gym background
          alt="Gym Equipment"
          fill
          priority
          className="object-cover absolute z-0"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-blue-600/70 z-10"></div>
        <div className="relative z-20 text-center max-w-3xl px-4">
          <h1 className="text-5xl font-bold mb-6 text-white drop-shadow-lg">
            Transform Your Fitness, Elevate Your Potential
          </h1>
          <p className="text-xl mb-8 text-gray-100 max-w-2xl mx-auto">
            Premium gym equipment designed for professionals and fitness enthusiasts. 
            Engineered for performance, built to last.
          </p>
          <div className="flex justify-center space-x-4">
            <Button 
              size="lg" 
              className="bg-orange-500 hover:bg-orange-600 transition-colors"
              asChild
            >
              <Link href="/products">Shop Equipment</Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-white border-white hover:bg-white/20 transition-colors"
              asChild
            >
              <Link href="/aboutUs">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Featured Products</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our top-rated gym equipment, meticulously selected to enhance your training experience.
            </p>
          </div>
          {productLoading ? (
            <div className="text-center text-gray-600">Loading products...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map((product) => (
                <Card 
                  key={product.id} 
                  className="border-2 border-gray-100 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-2"
                >
                  <CardHeader className="p-0">
                    <Image
                      src={product.image || `/placeholder.svg?height=300&width=400&text=${product.name}`}
                      alt={product.name}
                      width={400}
                      height={300}
                      className="w-full h-64 object-cover"
                    />
                  </CardHeader>
                  <CardContent className="p-6">
                    <CardTitle className="text-xl font-semibold mb-2 line-clamp-1">
                      {product.name}
                    </CardTitle>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex text-yellow-500">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="h-5 w-5 fill-current" />
                        ))}
                        <span className="text-gray-600 ml-2 text-sm">(24)</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center p-6 pt-0">
                    <span className="text-2xl font-bold text-blue-600">
                      Rs: {product.price}
                    </span>
                    <Button 
                      size="lg" 
                      variant="default"
                    >
                      <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
          <div className="text-center mt-12">
            <Button 
              asChild 
              size="lg" 
              variant="ghost"
            >
              <Link href="/products">
                View All Products <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Customer Experiences</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Real stories from fitness professionals and enthusiasts who have transformed their training with our equipment.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out"
              >
                <div className="flex items-center mb-6">
                  <Image 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    width={80} 
                    height={80} 
                    className="rounded-full mr-4 object-cover" 
                  />
                  <div>
                    <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                    <p className="text-gray-600 text-sm">{testimonial.title}</p>
                  </div>
                </div>
                <p className="italic text-gray-700 mb-4">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Stay Ahead of Your Fitness Game</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Get exclusive deals, workout tips, and be the first to know about new equipment releases.
          </p>
          <form onSubmit={handleNewsletterSignup} className="max-w-md mx-auto flex space-x-4">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-grow text-black"
            />
            <Button 
              type="submit" 
              size="lg" 
              className="bg-orange-500 hover:bg-orange-600 transition-colors"
            >
              <Check className="mr-2 h-5 w-5" /> Subscribe
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
}