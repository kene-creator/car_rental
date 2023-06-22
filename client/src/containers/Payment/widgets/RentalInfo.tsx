import React, { useState } from "react";

import { useDispatch } from "react-redux";
import {
  setPickUpDate,
  setPickUpTimeState,
  setPickUpLocation,
  setDropOffTime,
  setDropOffDate,
  setDropOffLocation,
} from "../../../app/rental_info.state";

import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CountrySelect from "../../../components/CountryList";

interface RentalInfoProps {
  rentalInfo: any; // Update the type to match the structure of your rentalInfo data
  rentalInfoState: boolean;
}

const RentalInfo: React.FC<RentalInfoProps> = ({
  rentalInfo,
  rentalInfoState,
}) => {
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

  const [selectedPickUpCountry, setSelectedPickUpCountry] =
    useState<string>("");
  const [selectedDropOffCountry, setSelectedDropOffCountry] =
    useState<string>("");

  const dispatch = useDispatch();

  const handlePickupDateChange = (date: any) => {
    setPickupDate(date);
    setSelectedPickupDate(date["$d"]);
    const isoString =  new Date(date["$d"]).toISOString();
    if (isoString) {
      dispatch(setPickUpDate(isoString));
    }
  };

  const handleDropoffDateChange = (date: any) => {
    setDropoffDate(date);
    setSelectedDropoffDate(date["$d"]);

    const isoString = new Date(date["$d"]).toISOString();
    if (isoString) {
      dispatch(setDropOffDate(isoString));
    }
  };

  const handlePickupTimeChange = (time: any) => {
    setPickupTime(time);
    setSelectedPickupTime(time["$d"]);

    const selectedTime = new Date(time["$d"]);
    const hours = selectedTime.getHours();
    const minutes = selectedTime.getMinutes();
    const seconds = selectedTime.getSeconds();

    const formattedTime = `${hours}:${minutes}:${seconds}`;

    dispatch(setPickUpTimeState(formattedTime));
  };

  const handleDropoffTimeChage = (time: any) => {
    setDropoffTime(time);
    setSelectedDropoffTime(time["$d"]);

    const selectedTime = new Date(time["$d"]);
    const hours = selectedTime.getHours();
    const minutes = selectedTime.getMinutes();
    const seconds = selectedTime.getSeconds();

    const formattedTime = `${hours}:${minutes}:${seconds}`;

    dispatch(setDropOffTime(formattedTime));
  };

  const handleCountryPickUpChange = (country: string): void => {
    setSelectedPickUpCountry(country);
    dispatch(setPickUpLocation(country));
  };
  const handleCountryDropOffChange = (country: string): void => {
    setSelectedDropOffCountry(country);
    dispatch(setDropOffLocation(country));
  };

  return (
    <div className="bg-white rounded-lg p-5 main_font">
      {rentalInfoState && (
        <p className="text-[0.8rem] text-red-600 font-medium">
          Please fill/select your pick-up and drop-off date *
        </p>
      )}
      <div className="pb-8">
        <h3 className="font-bold text-[1.3rem]">Rental Info</h3>
        <div className="text-[#90A3BF] flex justify-between items-center gap-4 text-[0.8rem] lg:text-[1rem]">
          <p>Please select your rental date</p>
          <p>Step 2 of 4</p>
        </div>
      </div>
      <div className="relative">
        {openPickupCalendar && (
          <div className="absolute lg:top-[10rem] md:top-[12rem] top-[15rem] right-0 lg:left-[12rem] md:right-[2rem] z-20 w-full md:w-[30%]  transition-all">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker", "DatePicker"]}>
                <DatePicker
                  label="Enter Pick-up Date"
                  value={pickupDate}
                  onChange={(newValue) => handlePickupDateChange(newValue)}
                  sx={{
                    backgroundColor: "white",
                    minWidth: "100% !important",
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>
        )}
        {openPickupClock && (
          <div className="absolute lg:top-[10rem] md:top-[20rem] top-[22rem] right-0 lg:right-[2rem] md:right-[2rem] z-20 w-full md:w-[30%]  transition-all">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["TimePicker", "TimePicker"]}>
                <TimePicker
                  label="Enter Pickup Time"
                  value={pickupTime}
                  onChange={(newValue) => handlePickupTimeChange(newValue)}
                  sx={{
                    backgroundColor: "white",
                    minWidth: "100% !important",
                  }}
                  onAccept={() => setOpenPickupClock(false)}
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>
        )}
        {openDropoffCalendar && (
          <div className="absolute lg:top-[21rem] md:top-[40rem] top-[37.5rem]  lg:left-[14rem] md:right-0 right-0 z-20 w-full md:w-[30%] transition-all">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker", "DatePicker"]}>
                <DatePicker
                  label="Enter Drop-off Date"
                  value={dropoffDate}
                  onChange={(newValue) => handleDropoffDateChange(newValue)}
                  sx={{
                    backgroundColor: "white",
                    minWidth: "100% !important",
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>
        )}
        {openDropoffClock && (
          <div className="absolute lg:top-[21rem] md:top-[40rem] top-[45rem]  lg:right-[1rem] md:right-0 right-0 z-30 w-full md:w-[30%] transition-all">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["TimePicker", "TimePicker"]}>
                <TimePicker
                  label="Enter Drop-off Time"
                  value={dropoffTime}
                  onChange={(newValue) => handleDropoffTimeChage(newValue)}
                  sx={{
                    backgroundColor: "white",
                    minWidth: "100% !important",
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>
        )}
        <div className="w-full py-6 px-6 z-0">
          <div className="flex gap-4">
            <input type="radio" checked />
            <h4>Pick-Up</h4>
          </div>
          <div className="flex flex-col lg:flex-row justify-between mt-4 gap-4">
            <div>
              <p className="font-semibold">Location</p>
              <CountrySelect onCountryChange={handleCountryPickUpChange} />
            </div>
            <div className="">
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
                    ? selectedPickupDate.toLocaleDateString(
                        navigator.language,
                        {
                          weekday: "long",
                          month: "long",
                          day: "numeric",
                        }
                      )
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
                    ? selectedPickupTime.toLocaleTimeString(
                        navigator.language,
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )
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
        <div className="bg-white rounded-md w-full py-6 px-6 z-0">
          <div className="flex gap-4">
            <input type="radio" checked />
            <h4>Drop-Off</h4>
          </div>
          <div className="flex flex-col lg:flex-row justify-between mt-4 gap-4">
            <div>
              <p className="font-semibold">Location</p>
              <CountrySelect onCountryChange={handleCountryDropOffChange} />
            </div>
            <div>
              <p className="font-semibold">Date</p>
              <div
                className="flex justify-between mt-4 cursor-pointer"
                onClick={() => {
                  if (
                    openPickupCalendar ||
                    openDropoffClock ||
                    openPickupClock
                  ) {
                    setOpenPickupCalendar(false);
                    setOpenDropoffClock(false);
                    setOpenPickupClock(false);
                  }
                  setOpenDropoffCalendar(!openDropoffCalendar);
                }}
              >
                <p className="text-slate-500 mr-6 text-sm lg:text-base">
                  {selectedDropoffDate
                    ? selectedDropoffDate.toLocaleDateString(
                        navigator.language,
                        {
                          weekday: "long",
                          month: "long",
                          day: "numeric",
                        }
                      )
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
                  if (
                    openPickupCalendar ||
                    openDropoffCalendar ||
                    openPickupClock
                  ) {
                    setOpenDropoffCalendar(false);
                    setOpenPickupCalendar(false);
                    setOpenPickupClock(false);
                  }
                  setOpenDropoffClock(!openDropoffClock);
                }}
              >
                <p className="text-slate-500 mr-6 text-sm lg:text-base ">
                  {selectedDropoffTime
                    ? selectedDropoffTime.toLocaleTimeString(
                        navigator.language,
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )
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
    </div>
  );
};

export default RentalInfo;
