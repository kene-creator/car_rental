import React from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import SectionWrapper from "../../hoc/SectionWrapper";

const PickDrop = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center w-full main_font gap-6 lg:mt-[-8rem] mt-[-4rem]">
      <div className="bg-white rounded-md w-full lg:w-[45%] py-6 px-6">
        <div className="flex gap-4">
          <input type="radio" checked />
          <h4>Pick-Up</h4>
        </div>
        <div className="flex flex-col lg:flex-row justify-between mt-4">
          <div className="lg:border-r lg:border-slate-500 lg:pr-6">
            <p className="font-semibold">Location</p>
            <div className="flex justify-between mt-4">
              <p className="text-slate-500 mr-6 text-sm lg:text-base ">
                Select your city
              </p>
              <KeyboardArrowDownIcon />
            </div>
          </div>
          <div className="lg:border-r lg:border-slate-500 lg:px-6 mt-4 lg:mt-0">
            <p className="font-semibold">Date</p>
            <div className="flex justify-between mt-4">
              <p className="text-slate-500 mr-6 text-sm lg:text-base">
                Select your date
              </p>
              <KeyboardArrowDownIcon />
            </div>
          </div>
          <div className="mt-4 lg:mt-0 lg:pl-6">
            <p className="font-semibold">Time</p>
            <div className="flex justify-between mt-4 items-center">
              <p className="text-slate-500 mr-6 text-sm lg:text-base ">
                Select your time
              </p>
              <KeyboardArrowDownIcon />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#3563E9] rounded-md p-2">
        <SwapVertIcon sx={{ color: "white" }} />
      </div>
      <div className="bg-white rounded-md w-full lg:w-[45%] py-6 px-6">
        <div className="flex gap-4">
          <input type="radio" checked />
          <h4>Pick-Up</h4>
        </div>
        <div className="flex flex-col lg:flex-row justify-between mt-4">
          <div className="lg:border-r lg:border-slate-500 lg:pr-6">
            <p className="font-semibold">Location</p>
            <div className="flex justify-between mt-4">
              <p className="text-slate-500 mr-6 text-sm lg:text-base ">
                Select your city
              </p>
              <KeyboardArrowDownIcon />
            </div>
          </div>
          <div className="lg:border-r lg:border-slate-500 lg:px-6 mt-4 lg:mt-0">
            <p className="font-semibold">Date</p>
            <div className="flex justify-between mt-4">
              <p className="text-slate-500 mr-6 text-sm lg:text-base">
                Select your date
              </p>
              <KeyboardArrowDownIcon />
            </div>
          </div>
          <div className="mt-4 lg:mt-0 lg:pl-6">
            <p className="font-semibold">Time</p>
            <div className="flex justify-between mt-4 items-center">
              <p className="text-slate-500 mr-6 text-sm lg:text-base ">
                Select your time
              </p>
              <KeyboardArrowDownIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SectionWrapper(PickDrop, "");
