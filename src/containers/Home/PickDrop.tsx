import React, { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import SectionWrapper from "../../hoc/SectionWrapper";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import TimePicker from "react-time-picker";

const PickDrop = () => {
  const [pickupDate, setPickupDate] = useState<Date>(new Date());
  const [dropoffDate, setDropoffDate] = useState<Date>(new Date());
  const [openPickupCalendar, setOpenPickupCalendar] = useState<Boolean>(false);
  const [openDropoffCalendar, setOpenDropoffCalendar] =
    useState<Boolean>(false);
  const [selectedPickupDate, setSelectedPickupDate] = useState<Date>();
  const [selectedDropoffDate, setSelectedDropoffDate] = useState<Date>();

  const [pickupTime, setPickupTime] = useState<Date>("0:00");
  const [openPickupClock, setOpenPickupClock] = useState<Boolean>(false);

  const handlePickupDateChange = (date: Date) => {
    setPickupDate(date);
    setSelectedPickupDate(date);
  };
  const handleDropoffDateChange = (date: Date) => {
    setDropoffDate(date);
    setSelectedDropoffDate(date);
  };

  const handlePickupTimeChage = (time: Date) => {
    setPickupTime(time);
  };

  return (
    <div className="relative flex flex-col md:flex-row justify-center items-center w-full main_font gap-6 lg:mt-[-8rem] mt-[-4rem] z-0">
      {openPickupCalendar && (
        <Calendar
          onChange={handlePickupDateChange as any}
          value={pickupDate}
          className="absolute md:bottom-[-17rem] bottom-[10rem] left-0 z-20"
        />
      )}
      {openPickupClock && (
        <TimePicker
          onChange={handlePickupTimeChage as any}
          value={pickupTime}
          className="absolute md:bottom-[-17rem] bottom-[10rem] left-0 z-20"
        />
      )}

      {openDropoffCalendar && (
        <Calendar
          onChange={handleDropoffDateChange as any}
          value={dropoffDate}
          className="absolute md:bottom-[-17rem] bottom-[-11rem] right-0 z-20"
        />
      )}
      <div className="bg-white rounded-md w-full lg:w-[45%] py-6 px-6 z-0">
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
            <div
              className="flex justify-between mt-4 cursor-pointer"
              onClick={() => setOpenPickupCalendar(!openPickupCalendar)}
            >
              <p className="text-slate-500 mr-6 text-sm lg:text-base">
                {selectedPickupDate
                  ? selectedPickupDate.toLocaleDateString(navigator.language, {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                    })
                  : "Select your date"}
              </p>
              <KeyboardArrowDownIcon />
            </div>
          </div>
          <div className="mt-4 lg:mt-0 lg:pl-6">
            <p className="font-semibold">Time</p>
            <div
              className="flex justify-between mt-4"
              onClick={() => setOpenPickupClock(!openPickupClock)}
            >
              <p className="text-slate-500 mr-6 text-sm lg:text-base ">
                Select your time
              </p>
              <KeyboardArrowDownIcon />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#3563E9] rounded-md lg:p-2 p-4 mt-[-2.5rem] lg:mt-0 z-10 shadow-blue-500 shadow-lg md:shadow-none">
        <SwapVertIcon sx={{ color: "white" }} />
      </div>
      <div className="bg-white rounded-md w-full lg:w-[45%] py-6 px-6 mt-[-2.5rem] md:mt-0">
        <div className="flex gap-4">
          <input type="radio" checked />
          <h4>Drop-Off</h4>
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
            <div
              className="flex justify-between mt-4"
              onClick={() => setOpenDropoffCalendar(!openDropoffCalendar)}
            >
              <p className="text-slate-500 mr-6 text-sm lg:text-base">
                {selectedDropoffDate
                  ? selectedDropoffDate.toLocaleDateString(navigator.language, {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                    })
                  : "Select your date"}
              </p>
              <KeyboardArrowDownIcon />
            </div>
          </div>
          <div className="mt-4 lg:mt-0 lg:pl-6">
            <p className="font-semibold">Time</p>
            <div className="flex justify-between mt-4">
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
