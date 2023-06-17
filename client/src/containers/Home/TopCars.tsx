import React from "react";

import SectionWrapper from "../../hoc/SectionWrapper";
import Car from "../../components/car";

import { CircularProgress } from "@mui/material";

import { useQuery } from "urql";
import { ICar } from "../../typings/car";

const POPULAR_CARS = `
query Query {
  popular_cars {
    createdAt
    dailyPrice
    discountPrice
    gasTank
    gearType
    id
    name
    monthlyPrice
    passenger
    thumbnailSrc
    updatedAt
    vehicle
  }
}
`;

type PopularCarsResponse = {
  popular_cars: ICar[];
};

const TopCars = () => {
  const [{ fetching, data, error }] = useQuery<PopularCarsResponse>({
    query: POPULAR_CARS,
  });

  if (fetching) {
    return (
      <div className="flex w-full justify-center items-center min-h-[18rem]">
        <CircularProgress size={100} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex w-full justify-center items-center min-h-[50rem]">
        Error⚠: {error.message}
      </div>
    );
  }

  return (
    <div className="main_font mt-[-5rem] min-h-[18rem]">
      <div className="flex justify-between">
        <p className="text-slate-400 main_font">Popular Car</p>
        <a href="/popular-cars" className="text-[#3563E9]">
          View All
        </a>
      </div>
      <div className="w-full flex gap-3 flex-nowrap overflow-scroll scrollbar-hide mt-6">
        {data?.popular_cars.map((car, i) => (
          <Car
            key={i}
            name={car.name}
            dailyPrice={car.dailyPrice}
            monthlyPrice={car.monthlyPrice}
            mileage={car.mileage}
            gearType={car.gearType}
            gasTank={car.gasTank}
            vehicle={car.vehicle}
            discountPrice={car.discountPrice}
            passenger={car.passenger}
            thumbnailSrc={car.thumbnailSrc}
          ></Car>
        ))}
      </div>
    </div>
  );
};
export default SectionWrapper(TopCars, "Top Cars");
