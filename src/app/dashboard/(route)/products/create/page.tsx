"use client";

import { useCategory } from "@/app/hooks/useCategory";
import { useProduct } from "@/app/hooks/useProduct";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function ProductCreate() {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [imageUrl, setImageUrl] = useState<File | null>(null);
  const [quantity, setQuantity] = useState(0);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  const { loading, addProducts } = useProduct();
  const { categories, fetchAllCategories } = useCategory();
  const router = useRouter();

  useEffect(() => {
    fetchAllCategories();
  }, [fetchAllCategories]);

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedCategoryId) {
      console.error("No category selected");
      return;
    }

    try {
      const result = await addProducts({
        name: productName,
        description: productDescription,
        price,
        image: imageUrl as File,
        quantity,
        categoryId: selectedCategoryId,
      });
      console.log("Product created-->", result);
      router.push("/dashboard/products");
    } catch (error) {
      console.error("Error creating product: ", error);
    } finally {
      resetForm();
    }
  };

  const resetForm = () => {
    setProductName("");
    setProductDescription("");
    setPrice(0);
    setImageUrl(null);
    setQuantity(0);
    setSelectedCategoryId("");
  };

  return (
    <>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Create New Product</CardTitle>
          <CardDescription>
            Fill the details to create new product
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleCreateProduct}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="productName">Product Name</Label>
              <Input
                id="productName"
                type="text"
                placeholder="Enter the product name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="productDescription">Product Description</Label>
              <Textarea
                id="productName"
                placeholder="Enter the product description"
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="Enter the product price"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  placeholder="Enter the product quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={selectedCategoryId}
                onValueChange={setSelectedCategoryId}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="productImage">Product Image</Label>
              <Input
                id="productImage"
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setImageUrl(e.target.files ? e.target.files[0] : null)
                }
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Creating..." : "Create Product"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </>
  );
}

export default ProductCreate;
