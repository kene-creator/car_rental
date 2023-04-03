import React from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SwapVertIcon from "@mui/icons-material/SwapVert";

export default function PickDrop() {
  return (
    <div className="flex justify-center items-center w-full main_font gap-6">
      <div className="bg-white rounded-md w-[45%] py-6 px-12">
        <div className="flex gap-4">
          <input type="radio" checked />
          <h4>Pick-Up</h4>
        </div>
        <div className="flex justify-between mt-4">
          <div className="border-r border-slate-500 pr-6">
            <p className="font-semibold">Location</p>
            <div className="flex justify-between mt-4">
              <p className="text-slate-500 mr-6">Select your city</p>
              <KeyboardArrowDownIcon />
            </div>
          </div>
          <div className="border-r border-slate-500 px-6">
            <p className="font-semibold">Date</p>
            <div className="flex justify-between mt-4">
              <p className="text-slate-500 mr-6">Select your date</p>
              <KeyboardArrowDownIcon />
            </div>
          </div>
          <div className="pl-6">
            <p className="font-semibold">Time</p>
            <div className="flex justify-between mt-4 items-center">
              <p className="text-slate-500 mr-6">Select your time</p>
              <KeyboardArrowDownIcon />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#3563E9] rounded-md p-2">
        <SwapVertIcon sx={{ color: "white" }} />
      </div>
      <div className="bg-white rounded-md w-[45%] py-6 px-12">
        <div className="flex gap-4">
          <input type="radio" checked />
          <h4>Pick-Up</h4>
        </div>
        <div className="flex justify-between mt-4">
          <div className="border-r border-slate-500 pr-6">
            <p className="font-semibold">Location</p>
            <div className="flex justify-between mt-4">
              <p className="text-slate-500 mr-6">Select your city</p>
              <KeyboardArrowDownIcon />
            </div>
          </div>
          <div className="border-r border-slate-500 px-6">
            <p className="font-semibold">Date</p>
            <div className="flex justify-between mt-4">
              <p className="text-slate-500 mr-6">Select your date</p>
              <KeyboardArrowDownIcon />
            </div>
          </div>
          <div className="pl-6">
            <p className="font-semibold">Time</p>
            <div className="flex justify-between mt-4 items-center">
              <p className="text-slate-500 mr-6">Select your time</p>
              <KeyboardArrowDownIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
