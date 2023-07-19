import React, { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import SectionWrapper from "../../hoc/SectionWrapper";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import CountrySelect from "../../components/CountryList";

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

  const [selectedCountry, setSelectedCountry] = useState("");

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

  const handleCountryChange = (country: string): void => {
    setSelectedCountry(country);
  };

  return (
    <div className="relative flex flex-col justify-center items-center w-full main_font gap-6 lg:mt-[-8rem] mt-[-4rem] z-0">
      {openPickupCalendar && (
        <div className="absolute lg:top-[10rem] md:top-[14.5rem] top-[16rem] right-0 lg:left-[30rem] md:right-[2rem] z-20 w-full md:w-[30%]  transition-all">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker", "DatePicker"]}>
              <DatePicker
                label="Enter Pick-up Date"
                value={pickupDate}
                onChange={(newValue) => handlePickupDateChange(newValue)}
                sx={{
                  backgroundColor: "white",
                }}
              />
            </DemoContainer>
          </LocalizationProvider>
        </div>
      )}
      {openPickupClock && (
        <div className="absolute lg:top-[8.5rem] md:top-[20rem] top-[12rem] right-0 lg:right-[2rem] md:right-[2rem] z-20 w-full md:w-[30%]  transition-all">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["TimePicker", "TimePicker"]}>
              <TimePicker
                label="Enter Pickup Time"
                value={pickupTime}
                onChange={(newValue) => handlePickupTimeChage(newValue)}
                sx={{
                  backgroundColor: "white",
                }}
                onAccept={() => setOpenPickupClock(false)}
              />
            </DemoContainer>
          </LocalizationProvider>
        </div>
      )}

      {openDropoffCalendar && (
        <div className="absolute lg:top-[27rem] md:top-[40rem] top-[41rem]  lg:left-[22rem] md:right-0 right-0 z-20 w-full md:w-[30%] transition-all">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker", "DatePicker"]}>
              <DatePicker
                label="Enter Drop-off Date"
                value={dropoffDate}
                onChange={(newValue) => handleDropoffDateChange(newValue)}
                sx={{
                  backgroundColor: "white",
                }}
              />
            </DemoContainer>
          </LocalizationProvider>
        </div>
      )}
      {openDropoffClock && (
        <div className="absolute lg:top-[27rem] md:top-[46.5rem] top-[46rem]  lg:right-[5.5rem] md:right-0 right-0 z-20 w-full md:w-[30%] transition-all">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["TimePicker", "TimePicker"]}>
              <TimePicker
                label="Enter Drop-off Time"
                value={dropoffTime}
                onChange={(newValue) => handleDropoffTimeChage(newValue)}
                sx={{
                  backgroundColor: "white",
                }}
              />
            </DemoContainer>
          </LocalizationProvider>
        </div>
      )}
      <div className="bg-white rounded-md w-full lg:w-[80%] py-6 px-6 z-0">
        <div className="flex gap-4">
          <input type="radio" checked />
          <h4>Pick-Up</h4>
        </div>
        <div className="flex flex-col lg:flex-row justify-between lg:justify-center mt-4">
          <div className="lg:border-r lg:border-slate-500 lg:pr-6">
            <p className="font-semibold">Location</p>
            <CountrySelect onCountryChange={handleCountryChange} />
          </div>
          <div className="lg:border-r lg:border-slate-500 lg:px-6 mt-4 lg:mt-0">
            <p className="font-semibold">Date</p>
            <div
              className="flex justify-between mt-4 cursor-pointer"
              onClick={() => {
                if (
                  openDropoffCalendar ||
                  openDropoffClock ||
                  openPickupClock
                ) {
                  setOpenDropoffCalendar(false);
                  setOpenDropoffClock(false);
                  setOpenPickupClock(false);
                }
                setOpenPickupCalendar(!openPickupCalendar);
              }}
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
              <div
                className={
                  openPickupCalendar
                    ? "rotate-180 transition-all"
                    : "transition-all"
                }
              >
                <KeyboardArrowDownIcon />
              </div>
            </div>
          </div>
          <div className="mt-4 lg:mt-0 lg:pl-6">
            <p className="font-semibold">Time</p>
            <div
              className="flex justify-between mt-4 cursor-pointer"
              onClick={() => {
                if (
                  openDropoffCalendar ||
                  openDropoffClock ||
                  openPickupCalendar
                ) {
                  setOpenDropoffCalendar(false);
                  setOpenDropoffClock(false);
                  setOpenPickupCalendar(false);
                }
                setOpenPickupClock(!openPickupClock);
              }}
            >
              <p className="text-slate-500 mr-6 text-sm lg:text-base ">
                {selectedPickupTime
                  ? selectedPickupTime.toLocaleTimeString(navigator.language, {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "Select pickup time"}
              </p>
              <div
                className={
                  openPickupClock
                    ? "rotate-180 transition-all"
                    : "transition-all"
                }
              >
                <KeyboardArrowDownIcon />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#3563E9] rounded-md lg:p-2 p-4 mt-[-2.5rem] lg:mt-0 z-10 shadow-blue-500 shadow-lg md:shadow-none">
        <SwapVertIcon sx={{ color: "white" }} />
      </div>
      <div className="bg-white rounded-md w-full lg:w-[80%] py-6 px-6 z-0">
        <div className="flex gap-4">
          <input type="radio" checked />
          <h4>Drop-Off</h4>
        </div>
        <div className="flex flex-col lg:flex-row justify-between lg:justify-center mt-4">
          <div className="lg:border-r lg:border-slate-500 lg:pr-6">
            <p className="font-semibold">Location</p>
            <CountrySelect onCountryChange={handleCountryChange} />
          </div>
          <div className="lg:border-r lg:border-slate-500 lg:px-6 mt-4 lg:mt-0">
            <p className="font-semibold">Date</p>
            <div
              className="flex justify-between mt-4 cursor-pointer"
              onClick={() => {
                if (openPickupCalendar || openDropoffClock || openPickupClock) {
                  setOpenPickupCalendar(false);
                  setOpenDropoffClock(false);
                  setOpenPickupClock(false);
                }
                setOpenDropoffCalendar(!openDropoffCalendar);
              }}
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
              <div
                className={
                  openDropoffCalendar
                    ? "rotate-180 transition-all"
                    : "transition-all"
                }
              >
                <KeyboardArrowDownIcon />
              </div>
            </div>
          </div>
          <div className="mt-4 lg:mt-0 lg:pl-6">
            <p className="font-semibold">Time</p>
            <div
              className="flex justify-between mt-4 cursor-pointer"
              onClick={() => {
                if (openPickupCalendar || openDropoffClock || openPickupClock) {
                  setOpenDropoffCalendar(false);
                  setOpenPickupCalendar(false);
                  setOpenPickupClock(false);
                }
                setOpenDropoffClock(!openDropoffClock);
              }}
            >
              <p className="text-slate-500 mr-6 text-sm lg:text-base ">
                {selectedDropoffTime
                  ? selectedDropoffTime.toLocaleTimeString(navigator.language, {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "Select drop-off time"}
              </p>
              <div
                className={
                  openDropoffClock
                    ? "rotate-180 transition-all"
                    : "transition-all"
                }
              >
                <KeyboardArrowDownIcon />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SectionWrapper(PickDrop, "");
