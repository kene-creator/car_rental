import React from "react";

interface CustomButtonProps {
  //   onClick: () => void;
  disabled: boolean;
}

const PaymentButton: React.FC<CustomButtonProps> = ({ disabled }) => {
  return (
    <button
      //   onClick={onClick}
      disabled={disabled}
      className={`bg-blue-500 text-white font-bold py-2 px-4 rounded-lg  main_font w-[40%] lg:w-[20%] absolute bottom-[9rem] md:bottom-[8rem] left-5 z-30 ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      Rent Now
    </button>
  );
};

export default PaymentButton;
