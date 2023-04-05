import React from "react";
import { ICar } from "../../typings/car";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
import GroupIcon from "@mui/icons-material/Group";
import Button from "../Button";

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
  return (
    <div className="min-w-[17rem] min-h-[22rem] max-h-[22rem] flex flex-col items-center p-3 bg-white rounded-md main_font">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <p className="text-[1rem] font-bold text-black">{name}</p>
          <p className="text-[0.4rem] text-slate-400 font-normal">{vehicle}</p>
        </div>
        <FavoriteIcon sx={{ backgroundColor: "#ED3F3F" }} />
      </div>
      <div className="w-full h-auto">
        <img src={thumbnailSrc} alt="car" className="w-full h-full" />
      </div>
      <div className="flex justify-between">
        <div className="flex gap-1">
          <LocalGasStationIcon sx={{ backgroundColor: "#90A3BF" }} />
          <p className="text-[0.4rem] text-slate-400 font-normal">{gasTank}</p>
        </div>
        <div className="flex gap-1">
          <DirectionsCarFilledIcon sx={{ backgroundColor: "#90A3BF" }} />
          <p className="text-[0.4rem] text-slate-400 font-normal">{gearType}</p>
        </div>
        <div>
          <GroupIcon sx={{ backgroundColor: "#90A3BF" }} />
          <p className="text-[0.4rem] text-slate-400 font-normal">
            {passenger}
          </p>
        </div>
      </div>
      <div>
        <div className="flex flex-col">
          <p className="text-[1.6rem] text-black font-bold">
            {dailyPrice}/
            <span className="text-[0.4rem] text-slate-400 font-normal">
              day
            </span>
          </p>
          <p className="text-[0.6rem] text-slate-400 font-semibold line-through">
            {discountPrice}
          </p>
        </div>
        <div>
          <Button>Rental Car</Button>
        </div>
      </div>
    </div>
  );
}
