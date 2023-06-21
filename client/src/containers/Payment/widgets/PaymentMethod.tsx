import React from "react";
import visaLogo from "../../../assets/icons/Visa.png";
import paypal_Logo from "../../../assets/icons/PayPal.png";
import bitcoin_Logo from "../../../assets/icons/Bitcoin.png";

interface PaymentMethodProps {
  selectedPaymentMethod: string;
  onPaymentMethodChange: (paymentMethod: string) => void;
}

const PaymentMethod: React.FC<PaymentMethodProps> = ({
  selectedPaymentMethod,
  onPaymentMethodChange,
}) => {
  const isPaymentMethodSelected = (paymentMethod: string) =>
    selectedPaymentMethod === paymentMethod;

  return (
    <div className="bg-white rounded-lg p-5 main_font">
      <div className="pb-8">
        <h3 className="font-bold text-[1.3rem]">Payment Method</h3>
        <div className="text-[#90A3BF] flex justify-between items-center">
          <p>Please select your payment method</p>
          <p>Step 3 of 4</p>
        </div>
      </div>
      <div
        className={`flex items-center mb-4 justify-between bg-[#F6F7F9] py-4 px-2 rounded-3xl transition-all ${
          isPaymentMethodSelected("Paystack") ? "selected" : ""
        } ${
          selectedPaymentMethod === "Paystack"
            ? "border-[2px] border-blue-400"
            : ""
        }`}
        onClick={() => onPaymentMethodChange("Paystack")}
      >
        <div className="flex">
          <input
            type="radio"
            id="paystack"
            name="paymentMethod"
            value="Paystack"
            checked={isPaymentMethodSelected("Paystack")}
            onChange={() => onPaymentMethodChange("Paystack")}
            className="mr-2 hidden"
          />
          <div>
            <p className="text-[0.8rem] ml-6 font-medium">Pay using Paystack</p>
          </div>
        </div>
        <label htmlFor="paystack">
          <img src={visaLogo} alt="Visa" className="w-[70%] md:w-[100%]" />
        </label>
      </div>

      <div
        className={`flex items-center mb-4 justify-between bg-[#F6F7F9] py-4 px-2 rounded-3xl transition-all ${
          isPaymentMethodSelected("Flutter") ? "selected" : ""
        } ${
          selectedPaymentMethod === "Flutter"
            ? "border-[2px] border-blue-400"
            : ""
        }`}
        onClick={() => onPaymentMethodChange("Flutter")}
      >
        <div className="flex">
          <input
            type="radio"
            id="flutter"
            name="paymentMethod"
            value="Flutter"
            checked={isPaymentMethodSelected("Flutter")}
            onChange={() => onPaymentMethodChange("Flutter")}
            className="mr-2 hidden"
          />
          <div>
            <p className="text-[0.8rem] ml-6 font-medium">
              Pay using FlutterWave
            </p>
          </div>
        </div>
        <label htmlFor="flutter">
          <img src={visaLogo} alt="Visa" className="w-[70%] md:w-[100%]" />
        </label>
      </div>

      <div
        className={`flex items-center mb-4 justify-between bg-[#F6F7F9] py-4 px-2 rounded-3xl transition-all ${
          isPaymentMethodSelected("Paypal") ? "selected" : ""
        } ${
          selectedPaymentMethod === "Paypal"
            ? "border-[2px] border-blue-400"
            : ""
        }`}
        onClick={() => onPaymentMethodChange("Paypal")}
      >
        <div className="flex">
          <input
            type="radio"
            id="paypal"
            name="paymentMethod"
            value="Paypal"
            checked={isPaymentMethodSelected("Paypal")}
            onChange={() => onPaymentMethodChange("Paypal")}
            className="mr-2 hidden"
          />
          <div>
            <p className="text-[0.8rem] ml-6 font-medium">Pay using Paypal</p>
          </div>
        </div>
        <label htmlFor="paypal">
          <img src={paypal_Logo} alt="Visa" className="w-[70%] md:w-[100%]" />
        </label>
      </div>

      <div
        className={`flex items-center mb-4 justify-between bg-[#F6F7F9] py-4 px-2 rounded-3xl transition-all ${
          isPaymentMethodSelected("Bitcoin") ? "selected" : ""
        } ${
          selectedPaymentMethod === "Bitcoin"
            ? "border-[2px] border-blue-400"
            : ""
        }`}
        onClick={() => onPaymentMethodChange("Bitcoin")}
      >
        <div className="flex">
          <input
            type="radio"
            id="bitcoin"
            name="paymentMethod"
            value="Bitcoin"
            checked={isPaymentMethodSelected("Bitcoin")}
            onChange={() => onPaymentMethodChange("Bitcoin")}
            className="mr-2 hidden"
          />
          <div>
            <p className="text-[0.8rem] ml-6 font-medium">Pay using Bitcoin</p>
          </div>
        </div>
        <label htmlFor="bitcoin">
          <img src={bitcoin_Logo} alt="Visa" className="w-[70%] md:w-[100%]" />
        </label>
      </div>
    </div>
  );
};

export default PaymentMethod;
