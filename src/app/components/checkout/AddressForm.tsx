"use client";

import { useAddress } from "@/app/hooks/useAddress";
import { useOrder } from "@/app/hooks/useOrder";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useState } from "react";

interface AddressFormProps {
  onNext: () => void;
}

const AddressForm = ({ onNext }: AddressFormProps) => {
  const { addresses, selectedAddressId, setSelectedAddressAction } = useOrder();
  const {
    addAddress,
    loading: addressLoading,
    error: addressError,
  } = useAddress();

  const [addressLine1, setAddressLine1] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const handleAddressSelect = (addressId: string) => {
    setSelectedAddressAction(addressId);
  };

  const handleAddNewAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newAddress = await addAddress({
        address1: addressLine1,
        city,
        state,
        country,
        postalCode,
      }); // debug here
      console.log("New address added-->: ", newAddress, newAddress.payload);
      setSelectedAddressAction(newAddress.payload.id);// debug here
      onNext();
    } catch (err) {
      console.error("Error adding new address: ", err);
      alert("Error adding address. Please try again.");
    }
  };

  const handleExistingAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedAddressId) {
      onNext();
    } else {
      alert("Please select an address");
    }
  };

  if (addressError) {
    return <div className="text-red-500">{addressError}</div>;
  }

  return (
    <>
      <div className="space-y-6">
        {addresses.length > 0 && (
          <form className="space-y-4" onSubmit={handleExistingAddressSubmit}>
            <h2 className="text-xl font-semibold">Select Address</h2>
            <Select
              onValueChange={handleAddressSelect}
              value={selectedAddressId || undefined}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select an Address" />
              </SelectTrigger>
              <SelectContent>
                {addresses.map((address) => (
                  <SelectItem key={address.id} value={address.id}>
                    {address.address1} {address.city} {address.state}{" "}
                    {address.country} {address.postalCode}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button type="submit" disabled={!selectedAddressId}>
              Use Selected Address
            </Button>
          </form>
        )}

        <form className="space-y-4" onSubmit={handleAddNewAddress}>
          <h2 className="text-xl font-semibold">Add New Address</h2>
          <div className="space-y-2">
            <Label htmlFor="address1">Address Line 1</Label>
            <Input
              id="address1"
              type="text"
              value={addressLine1}
              placeholder="Enter address line 1"
              onChange={(e) => setAddressLine1(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="city">city</Label>
            <Input
              id="city"
              type="text"
              value={city}
              placeholder="Enter city"
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="state">State</Label>
            <Input
              id="state"
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              placeholder="Enter state"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address1">Country</Label>
            <Input
              id="country"
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Enter country"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="postalCode">Postal Code</Label>
            <Input
              id="postalCode"
              type="text"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              placeholder="Enter postal code"
            />
          </div>
          <Button type="submit" className="w-full">
            {addressLoading ? "Creating..." : " Add New Address"}
          </Button>
        </form>
      </div>
    </>
  );
};

export default AddressForm;
