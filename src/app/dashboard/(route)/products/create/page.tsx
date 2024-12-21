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
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function ProductCreate() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState<File | null>(null);
  const [quantity, setQuantity] = useState(0);
  const [categoryId, setCategoryId] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const { loading, addProducts } = useProduct();
  const { categories, fetchAllCategories } = useCategory();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    fetchAllCategories();
  }, [fetchAllCategories]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      console.error("File is not an image");
      setImage(null);
      setImagePreview(null);
    }
  };

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!categoryId) {
      console.error("No category selected");
      return;
    }

    if (!image) {
      console.error("No image selected");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("image", image);
      if (
        name &&
        description &&
        price >= 0 &&
        quantity >= 0 &&
        categoryId &&
        image
      ) {
        formData.append("name", name);
        formData.append("description", description);
        formData.append("price", price.toString());
        formData.append("quantity", quantity.toString());
        formData.append("categoryId", categoryId);

        const result = await addProducts(formData);
        if (result.meta.requestStatus === "rejected") {
          toast({
            title: "Product Creation Failed",
            description:
              "There was an error creating the product. Please try again.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Product Created Successfully",
            description: "The product has been created successfully.",
            variant: "default",
            className: "bg-green-100 border-green-400 text-green-900",
          });
        }
        router.push("/dashboard/products");
      }
    } catch (error) {
      console.error("Error creating product: ", error);
      toast({
        title: "Product Creation Failed",
        description:
          "There was an error creating the product. Please try again.",
        variant: "destructive",
      });
    } finally {
      resetForm();
    }
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setPrice(0);
    setImage(null);
    setQuantity(0);
    setCategoryId("");
    setImagePreview(null);
  };

  return (
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
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="productDescription">Product Description</Label>
            <Textarea
              id="productDescription"
              placeholder="Enter the product description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
            <Select value={categoryId} onValueChange={setCategoryId}>
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
            <Label htmlFor="image">Product Image</Label>
            <Input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
            {imagePreview && (
              <Image
                src={imagePreview}
                alt="Preview"
                className="mt-2 max-w-full h-auto"
                width={200}
                height={200}
              />
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-1 h-4 w-4 animate-spin" />
                Creating..
              </>
            ) : (
              "Create Product"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}

export default ProductCreate;
