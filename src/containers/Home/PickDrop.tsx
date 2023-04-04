import React, { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import SectionWrapper from "../../hoc/SectionWrapper";
import "react-calendar/dist/Calendar.css";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

const PickDrop = () => {
  const [pickupDate, setPickupDate] = React.useState<Dayjs | null>(
    dayjs(new Date())
  );
  const [dropoffDate, setDropoffDate] = React.useState<Dayjs | null>(
    dayjs(new Date())
  );

  const [openPickupCalendar, setOpenPickupCalendar] = useState<Boolean>(false);
  const [openDropoffCalendar, setOpenDropoffCalendar] =
    useState<Boolean>(false);
  const [selectedPickupDate, setSelectedPickupDate] = useState<Date>();
  const [selectedDropoffDate, setSelectedDropoffDate] = useState<Date>();

  const [pickupTime, setPickupTime] = React.useState<Dayjs | null>(
    dayjs(new Date())
  );
  const [openPickupClock, setOpenPickupClock] = useState<Boolean>(false);
  const [selectedPickupTime, setSelectedPickupTime] = useState<Date>();
  const [dropoffTime, setDropoffTime] = React.useState<Dayjs | null>(
    dayjs(new Date())
  );
  const [openDropoffClock, setOpenDropoffClock] = useState<Boolean>(false);
  const [selectedDropoffTime, setSelectedDropoffTime] = useState<Date>();

  const handlePickupDateChange = (date: any) => {
    setPickupDate(date);
    setSelectedPickupDate(date["$d"]);
  };
  const handleDropoffDateChange = (date: any) => {
    setDropoffDate(date);
    setSelectedDropoffDate(date["$d"]);
  };

  const handlePickupTimeChage = (time: any) => {
    setPickupTime(time);
    setSelectedPickupTime(time["$d"]);
  };
  const handleDropoffTimeChage = (time: any) => {
    setDropoffTime(time);
    setSelectedDropoffTime(time["$d"]);
  };

  return (
    <div className="relative flex flex-col md:flex-row justify-center items-center w-full main_font gap-6 lg:mt-[-8rem] mt-[-4rem] z-0">
      {openPickupCalendar && (
        <div className="absolute md:top-[10rem] top-[13rem] right-0 md:left-0 z-20 w-full md:w-[30%] bg-white transition-all">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker", "DatePicker"]}>
              <DatePicker
                label="Enter Pick-up Date"
                value={pickupDate}
                onChange={(newValue) => handlePickupDateChange(newValue)}
              />
            </DemoContainer>
          </LocalizationProvider>
        </div>
      )}
      {openPickupClock && (
        <div className="absolute md:top-[10rem] top-[10rem] right-0 md:left-0 lg:left-[15rem] z-20 w-full md:w-[40%] lg:w-[20%] bg-white transition-all">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["TimePicker", "TimePicker"]}>
              <TimePicker
                label="Enter Pickup Time"
                value={pickupTime}
                onChange={(newValue) => handlePickupTimeChage(newValue)}
              />
            </DemoContainer>
          </LocalizationProvider>
        </div>
      )}

      {openDropoffCalendar && (
        <div className="absolute md:top-[10rem] top-[35rem] right-0 md:right-0 z-20 w-full md:w-[30%] bg-white transition-all">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker", "DatePicker"]}>
              <DatePicker
                label="Enter Drop-off Date"
                value={dropoffDate}
                onChange={(newValue) => handleDropoffDateChange(newValue)}
              />
            </DemoContainer>
          </LocalizationProvider>
        </div>
      )}
      {openDropoffClock && (
        <div className="absolute md:bottom-[-3rem] bottom-[-3rem] right-0 md:right-0 lg:right-0 z-20 w-full md:w-[40%] lg:w-[20%] bg-white transition-all">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["TimePicker", "TimePicker"]}>
              <TimePicker
                label="Enter Drop-off Time"
                value={dropoffTime}
                onChange={(newValue) => handleDropoffTimeChage(newValue)}
              />
            </DemoContainer>
          </LocalizationProvider>
        </div>
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
              className="flex justify-between mt-4 cursor-pointer"
              onClick={() => setOpenPickupClock(!openPickupClock)}
            >
              <p className="text-slate-500 mr-6 text-sm lg:text-base ">
                {selectedPickupTime
                  ? selectedPickupTime.toLocaleTimeString(navigator.language, {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "Select pickup time"}
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
              className="flex justify-between mt-4 cursor-pointer"
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
            <div
              className="flex justify-between mt-4 cursor-pointer"
              onClick={() => setOpenDropoffClock(!openDropoffClock)}
            >
              <p className="text-slate-500 mr-6 text-sm lg:text-base ">
                {selectedDropoffTime
                  ? selectedDropoffTime.toLocaleTimeString(navigator.language, {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "Select drop-off time"}
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
