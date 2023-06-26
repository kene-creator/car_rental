import React from "react";
import { Rating } from "@mui/material";
import bg from "../../../assets/backgrounds/20899.jpg";

interface CarProps {
  thumbnailSrc: string;
  name: string;
  dailyPrice: number;
}

const RentalSummary = (props: CarProps) => {
  const { name, dailyPrice, thumbnailSrc } = props;
  return (
    <div className="bg-white p-5 rounded-lg main_font">
      <div className="py-2">
        <h3 className="font-bold text-[1.2rem]">Rental Summary</h3>
        <p className="text-[#90A3BF] text-[0.8rem] lg:text-[1rem] gap-4">
          Prices may change depending on the length of the rental and the price
          of your rental car.
        </p>
      </div>

      <div className="flex items-center justify-start gap-3 py-6 border-b-[#90a3bf83] border-b">
        <div
          style={{ backgroundImage: `url(${bg})` }}
          className="bg-center py-6 px-2 bg-cover rounded-lg flex items-center justify-center w-[40%]"
        >
          <img
            src={thumbnailSrc}
            alt="rental car"
            className="w-[90%] lg:w-[70%]"
          />
        </div>
        <div>
          <h4 className="text-[1.4rem] lg:text-[1.8rem] font-bold">{name}</h4>
          <div className="flex items-center gap-3">
            <Rating
              name="size-small"
              value={3.5}
              precision={0.5}
              size="small"
              readOnly
            />
            <p className="text-[#90A3BF]">440+ reviews</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 py-4">
        <div className="flex justify-between">
          <p className="text-[#90A3BF]">Subtotal</p>
          <p>${dailyPrice}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-[#90A3BF]">Tax</p>
          <p>$0</p>
        </div>
      </div>
      <div className="relative">
        <input
          type="text"
          className="w-full py-3 pl-4 pr-12 text-gray-800 bg-[#e9eaea6b] rounded-md focus:outline-none"
          placeholder="Enter your text"
        />
        <button className="absolute top-1/2 right-2 transform -translate-y-1/2 font-bold text-[0.8rem] lg:text-[1rem]">
          Apply Now
        </button>
      </div>

      <div className="flex justify-between pt-5">
        <div>
          <h4 className="font-bold text-[1rem]">Total Rental Price</h4>
          <p className="text-[0.7rem] text-[#90A3BF]">
            Overall rental price that includes rental discount
          </p>
        </div>
        <div>
          <h4 className="font-bold text-[1.8rem]">${dailyPrice}</h4>
        </div>
      </div>
    </div>
  );
};

export default RentalSummary;
