'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowRight, ShoppingCart, Star, Check } from 'lucide-react';
import Image from "next/image";
import Link from "next/link";
import { useProduct } from "./hooks/useProduct";
import { useEffect, useState } from "react";
import { Product } from "./types/products.types";
import { testimonials } from "@/utils/testimonial";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

export default function Home() {
  const { loading: productLoading, getAllProducts, products } = useProduct();
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [email, setEmail] = useState('');

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
    console.log('Signing up with email:', email);
    setEmail('');
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[700px] flex items-center justify-center text-white overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1709976142774-ce1ef41a8378?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Gym Equipment"
          fill
          priority
          className="object-cover absolute z-0"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-slate-800/80 z-10"></div>
        <div className="relative z-20 text-center max-w-3xl px-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-white drop-shadow-lg bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-200">
            Transform Your Fitness, Elevate Your Potential
          </h1>
          <p className="text-lg sm:text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
            Premium gym equipment designed for professionals and fitness
            enthusiasts. Engineered for performance, built to last.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white border-0 transition-colors w-full sm:w-auto"
              asChild
            >
              <Link href="/products">Shop Equipment</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 text-white border-white/20 bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all w-full sm:w-auto"
              asChild
            >
              <Link href="/aboutUs">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-white">Featured Products</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Discover our top-rated gym equipment, meticulously selected to enhance your training experience.
            </p>
          </div>
          {productLoading ? (
            <div className="text-center text-gray-300">Loading products...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
              {featuredProducts.map((product) => (
                <Card 
                  key={product.id} 
                  className="bg-slate-800/50 border-slate-700 backdrop-blur-sm rounded-xl overflow-hidden hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-300 ease-in-out transform hover:-translate-y-2 flex flex-col h-full"
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
                  <CardContent className="p-6 flex-grow">
                    <CardTitle className="text-xl font-semibold mb-2 line-clamp-1 text-white">
                      {product.name}
                    </CardTitle>
                    <p className="text-gray-300 mb-4 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex text-orange-500">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="h-5 w-5 fill-current" />
                        ))}
                        <span className="text-gray-400 ml-2 text-sm">(24)</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center p-6 pt-4 border-t border-slate-700/50 mt-auto">
                    <span className="text-2xl font-bold text-white">
                      Rs: {product.price}
                    </span>
                    <Button 
                      size="sm" 
                      className="bg-[#60A5FA] hover:bg-[#3B82F6] text-white border-0 transition-colors"
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
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
              variant="outline"
              className="border-2 text-white border-[#60A5FA]/20 bg-[#60A5FA]/10 hover:bg-[#60A5FA]/20 backdrop-blur-sm transition-all"
            >
              <Link href="/products">
                View All Products <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-b from-slate-800 to-slate-900 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">
              Customer Experiences
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Real stories from fitness professionals and enthusiasts who have
              transformed their training with our equipment.
            </p>
          </div>
          <div className="h-[400px] w-full overflow-hidden">
            <InfiniteMovingCards
              items={testimonials}
              direction="left"
              speed="slow"
            />
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[#60A5FA]"></div>
        <div className="container relative z-10 mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto backdrop-blur-sm bg-white/10 rounded-2xl p-8 border border-white/10">
            <h2 className="text-4xl font-bold mb-6 text-white">Stay Ahead of Your Fitness Game</h2>
            <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              Get exclusive deals, workout tips, and be the first to know about new equipment releases.
            </p>
            <form
              onSubmit={handleNewsletterSignup}
              className="max-w-md mx-auto flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
            >
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white/20 border-white/20 text-white placeholder:text-white/70 focus:border-white flex-grow"
              />
              <Button
                type="submit"
                size="lg"
                className="bg-white text-[#60A5FA] hover:bg-[#3B82F6] hover:text-white transition-colors font-semibold w-full sm:w-auto"
              >
                <Check className="mr-2 h-5 w-5" /> Subscribe
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

