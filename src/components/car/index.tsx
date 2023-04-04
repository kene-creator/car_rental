import React from "react";
import { ICar } from "../../typings/car";

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
  } = props;
  return <div>index</div>;
}
