import React, { useEffect, useState } from "react";

import SectionWrapper from "../../hoc/SectionWrapper";
import Car from "../../components/car";
import { CircularProgress } from "@mui/material";

import { useQuery } from "urql";
import { ICar } from "../../typings/car";
import { useDispatch } from "react-redux";
import { fetchAllCarsSuccess } from "../../app/all_cars.state";

const ALL_CARS = `
  query Query($offset: Int!) {
    cars(offset: $offset) {
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

type AllCarsResponse = {
  cars: ICar[];
};

const AllCars = () => {
  const [offset, setOffset] = useState(0);
  const [{ fetching, data, error }, reexecuteQuery] = useQuery<AllCarsResponse>(
    {
      query: ALL_CARS,
      variables: { offset },
    }
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      dispatch(fetchAllCarsSuccess(data.cars));
    }
  }, [data, dispatch]);

  useEffect(() => {
    reexecuteQuery({ requestPolicy: "network-only" });
  }, [offset, reexecuteQuery]);

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

  const handleLoadMore = () => {
    setOffset((prevOffset) => prevOffset + 8);
  };

  return (
    <div className="main_font mt-[-5rem] min-h-[18rem]">
      <div className="flex justify-between">
        <p className="text-slate-400 main_font">All Car</p>
        <a href="/popular-cars" className="text-[#3563E9]">
          View All
        </a>
      </div>
      <div className="w-full flex gap-3 flex-wrap mt-6 items-center justify-center">
        {data?.cars.map((car, i) => (
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
            id={car.id}
          ></Car>
        ))}
      </div>
      {data?.cars?.length && data.cars.length >= 8 && (
        <button
          className="bg-[#3563E9] py-3 px-4 mt-12 rounded-md text-white lg:w-[20%] font-semibold whitespace-nowrap flex items-center justify-center mx-auto"
          onClick={handleLoadMore}
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default SectionWrapper(AllCars, "Top Cars");
