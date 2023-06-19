import React, { ChangeEvent } from "react";
import InputComponent from "../../../components/Input";

interface BillingInfoProps {
  billingInfo: {
    name: string;
    phoneNumber: string;
    address: string;
    townCity: string;
  };
  onBillingInfoChange: (fieldName: string, value: string) => void;
}

function BillingInfo({ billingInfo, onBillingInfoChange }: BillingInfoProps) {
  const { name, phoneNumber, address, townCity } = billingInfo;

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    onBillingInfoChange("name", value);
  };

  const handlePhoneNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    onBillingInfoChange("phoneNumber", value);
  };

  const handleAddressChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    onBillingInfoChange("address", value);
  };

  const handleTownCityChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    onBillingInfoChange("townCity", value);
  };

  return (
    <div className="bg-white rounded-lg p-5 main_font">
      <div className="pb-8">
        <h3 className="font-bold text-[1.3rem]">Billing Info</h3>
        <div className="text-[#90A3BF] flex justify-between items-center">
          <p>Please enter your billing info</p>
          <p>Step 1 of 4</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-5 justify-between">
        <div className="flex flex-col gap-6">
          <InputComponent
            label="Name"
            value={name}
            onChange={handleNameChange}
          />
          <InputComponent
            label="Phone Number"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
          />
        </div>
        <div className="flex flex-col gap-6">
          <InputComponent
            label="Address"
            value={address}
            onChange={handleAddressChange}
          />
          <InputComponent
            label="Town/City"
            value={townCity}
            onChange={handleTownCityChange}
          />
        </div>
      </div>
    </div>
  );
}

export default BillingInfo;
