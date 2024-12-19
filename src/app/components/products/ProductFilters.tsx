"use client";

import { CategoryWithProducts } from "@/app/types/category.types";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useCallback } from "react";
import { Search } from "lucide-react";
import debounce from "lodash/debounce";
import { motion } from "framer-motion";

interface ProductFilterProps {
  categories: CategoryWithProducts[];
  onCategoryChange: (category: string) => void;
  onSearch: (searchItem: string) => void;
}

export function ProductFilter({
  categories,
  onCategoryChange,
  onSearch,
}: ProductFilterProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      onSearch(value);
    }, 300),
    [onSearch]
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    debouncedSearch(newSearchTerm);
  };

  return (
    <motion.div
    className="mb-8"
    initial={{opacity:0, y: -20}}
    animate={{opacity: 1, y: 0}}
    transition={{duration: 0.5}}
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="w-full md:w-1/3">
          <Select onValueChange={onCategoryChange}>
            <SelectTrigger className="w-full bg-white border-2 border-gray-200 rounded-md shadow-sm hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex-1 relative">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search Products"
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
