import React from "react";

type ButtonProps = {
  children: React.ReactNode;
};

const CarButton = ({ children }: ButtonProps) => {
  return (
    <button
      type="button"
      className="bg-[#3563E9] py-3 px-4 text-white text-[1rem] font-semibold whitespace-nowrap rounded-md"
    >
      {children}
    </button>
  );
};

export default CarButton;
