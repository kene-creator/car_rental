import React from "react";

type ButtonProps = {
  children: React.ReactNode;
};

const Button = ({ children }: ButtonProps) => {
  return (
    <button
      type="button"
      className="bg-[#3563E9] py-2 px-1 text-white lg:w-[60%] font-semibold"
    >
      {children}
    </button>
  );
};

export default Button;
