import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  DumbbellIcon,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  ShoppingBag,
  Twitter,
  User,
} from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-200 py-12 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <DumbbellIcon className="mr-2" /> ProLifts
            </h3>
            <p className="text-sm">
              Your one-stop shop for premium gym equipment and fitness
              accessories.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/products"
                  className="text-sm transition-colors hover:text-gray-400 flex items-center"
                >
                  <ShoppingBag className="mr-2 h-4 w-4" /> Products
                </Link>
              </li>
              <li>
                <Link
                  href="/aboutUs"
                  className="text-sm transition-colors hover:text-gray-400 flex items-center"
                >
                  <User className="mr-2 h-4 w-4" /> About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contactUs"
                  className="text-sm transition-colors hover:text-gray-400 flex items-center"
                >
                  <Mail className="mr-2 h-4 w-4" /> Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2">
              <li className="flex items-center text-sm">
                <MapPin className="mr-2 h-4 w-4" /> New Delhi, India
              </li>
              <li className="flex items-center text-sm">
                <Mail className="mr-2 h-4 w-4" /> contact@prolifts.com
              </li>
              <li className="flex items-center text-sm">
                <Phone className="mr-2 h-4 w-4" /> +91 1234567890
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
            <p className="text-sm mb-2">
              Stay updated with our latest offers and products.
            </p>
            <form className="flex space-x-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-800 border-gray-700 text-gray-200"
              />
              <Button
                type="submit"
                variant="outline"
                className="text-black hover:bg-black hover:text-gray-200  "
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>
        <Separator className="my-8 bg-gray-800" />
        <div className="flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-gray-400">
            &copy; 2025 ProLifts. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="#" className="text-gray-400 hover:text-gray-300">
              <Facebook className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-gray-300">
              <Instagram className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-gray-300">
              <Twitter className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
