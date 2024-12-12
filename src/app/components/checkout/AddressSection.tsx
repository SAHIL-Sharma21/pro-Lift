"use client";

import { useAddress } from "@/app/hooks/useAddress";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Loader2 } from "lucide-react";
import React, { useEffect } from "react";

interface AddressSectionProps {
  selectedAddress: string | null;
  onSelectedAddress: (addressId: string) => void;
  onNewAddress: () => void;
}

const AddressSection: React.FC<AddressSectionProps> = ({
  selectedAddress,
  onSelectedAddress,
  onNewAddress,
}) => {
  const { addresses, loading, error, getAllAdress } = useAddress();

  useEffect(() => {
    getAllAdress();
  }, [getAllAdress]);

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

  return (
    <>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Select Delivery Address</CardTitle>
        </CardHeader>
        <CardContent>
          {addresses && addresses.length > 0 ? (
            <>
              <RadioGroup
                value={selectedAddress || ""}
                onValueChange={onSelectedAddress}
              >
                {addresses.map((address) => (
                  <div
                    key={address.id}
                    className="flex items-center space-x-2 mb-2"
                  >
                    <RadioGroupItem
                      value={address.id}
                      id={`address-${address.id}`}
                    />
                    <Label
                      htmlFor={`address-${address.id}`}
                      className="flex-grow"
                    >
                      {address.AddressLine1}, {address.city}, {address.state},{" "}
                      {address.country} {address.postalCode}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </>
          ) : (
            <>
              <p>No addresses found. Please Add New Address</p>
            </>
          )}
          <Button onClick={onNewAddress} className="mt-4">
            {loading ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                    Adding...
                </>
            ) : "Add New Address"}
          </Button>
        </CardContent>
      </Card>
    </>
  );
};

export default AddressSection;
