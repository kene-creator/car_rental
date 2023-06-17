import React from "react";
import { ICar } from "../../typings/car";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
import GroupIcon from "@mui/icons-material/Group";
import CarButton from "../CarButton";

import { useNavigate } from "react-router-dom";

interface ICarProps extends ICar {}

export default function Car(props: ICarProps) {
  const {
    name,
    dailyPrice,
    monthlyPrice,
    mileage,
    gearType,
    gasTank,
    vehicle,
    discountPrice,
    passenger,
    thumbnailSrc,
  } = props;

  const navigate = useNavigate();

  return (
    <div className="max-w-[17rem] min-h-[22rem] max-h-[22rem] flex flex-col items-center p-5 bg-white rounded-md main_font">
      <div className="flex justify-between w-full">
        <div className="flex flex-col">
          <p className="text-[1rem] font-bold text-black">{name}</p>
          <p className="text-[0.65rem] text-slate-400 font-medium">{vehicle}</p>
        </div>
        <FavoriteIcon sx={{ color: "#ED3F3F" }} />
      </div>
      <div className="w-full h-auto m-[2.5rem]">
        <img src={thumbnailSrc} alt="car" className="w-full h-full" />
      </div>
      <div className="flex justify-between w-full">
        <div className="flex gap-1 items-center">
          <LocalGasStationIcon sx={{ color: "#90A3BF" }} />
          <p className="text-[0.8rem] text-slate-400 font-normal">{gasTank}</p>
        </div>
        <div className="flex gap-1 items-center">
          <DirectionsCarFilledIcon sx={{ color: "#90A3BF" }} />
          <p className="text-[0.8em] text-slate-400 font-normal">{gearType}</p>
        </div>
        <div className="flex gap-1 items-center">
          <GroupIcon sx={{ color: "#90A3BF" }} />
          <p className="text-[0.8rem] text-slate-400 font-normal">
            {passenger}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between mt-4 w-full">
        <div className="flex flex-col">
          <p className="text-[1.6rem] text-black font-bold">
            {dailyPrice}/
            <span className="text-[0.8rem] text-slate-400 font-normal">
              day
            </span>
          </p>
          <p className="text-[1rem] text-slate-400 font-semibold line-through">
            {discountPrice}
          </p>
        </div>
        <div>
          <CarButton onClick={() => navigate("/payment")}>Rent Now</CarButton>
        </div>
      </div>
    </div>
  );
}
