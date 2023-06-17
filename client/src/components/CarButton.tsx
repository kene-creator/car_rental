import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
};

const CarButton = ({ children, onClick }: ButtonProps) => {
  return (
    <button
      type="button"
      className="bg-[#3563E9] py-3 px-4 text-white text-[1rem] font-semibold whitespace-nowrap rounded-md"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default CarButton;
