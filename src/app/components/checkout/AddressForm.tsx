"use client";

import { useAddress } from "@/app/hooks/useAddress";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { useAuth } from "@/app/hooks/useAuth";

interface AddressFormProps {
    onAddressAdded: () => void
}


const AddressForm: React.FC<AddressFormProps> = ({onAddressAdded}) => {
  const [addressLine1, setAddressLine1] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const { addAddress, loading, error } = useAddress();
  const { isAuthenticated } = useAuth();

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Error</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{error}</p>
        </CardContent>
      </Card>
    );
  }

  const handleCreateAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      alert("You must be logged in to create an address.");
      return;
    }
    try {
      await addAddress({
        addressLine1,
        city,
        country,
        postalCode,
        state,
      });
      onAddressAdded();
      // Clear form fields after successful submission
      resetFrom();
    } catch (err: any) {
      console.log("Error creating address: ", err);
      alert("Error creating address");
    }
  };

  const resetFrom = () => {
    setAddressLine1("");
    setCity("");
    setState("");
    setCountry("");
    setPostalCode("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Address</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleCreateAddress} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="addressLine1">Address Line 1</Label>
            <Input
              type="text"
              id="addressLine1"
              value={addressLine1}
              onChange={(e) => setAddressLine1(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input
              type="text"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="state">State</Label>
            <Input
              type="text"
              id="state"
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Input
              type="text"
              id="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="postalCode">Postal Code</Label>
            <Input
              type="text"
              id="postalCode"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
            />
          </div>
          <Button
            type="submit"
            variant="outline"
            disabled={!isAuthenticated || loading}
          >
            {loading ? "Creating..." : "Create Address"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddressForm;
