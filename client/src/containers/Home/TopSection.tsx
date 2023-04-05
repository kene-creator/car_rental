import React from "react";
import SectionWrapper from "../../hoc/SectionWrapper";
import bg1 from "../../assets/backgrounds/Ads1.png";
import bg2 from "../../assets/backgrounds/20899.jpg";
import car_1 from "../../assets/images/car_1.png";
import car_2 from "../../assets/images/car_2.png";
import Button from "../../components/Button";

const TopSection = () => {
  return (
    <div className="flex gap-8 justify-center items-center mt-[-3rem] flex-col lg:flex-row w-full">
      <div
        className="w-full h-full bg-cover bg-no-repeat bg-center rounded-[1rem] p-6 flex flex-col"
        style={{ backgroundImage: `url(${bg1})` }}
      >
        <div className="text-white lg:w-[45%] w-[70%] main_font flex flex-col gap-4">
          <h3 className=" font-semibold text-[1.7rem] ">
            The Best Platform For Car Rental
          </h3>
          <p>
            Ease of doing a car rental safely and reliably. Of course at a low
            price.
          </p>
          <Button>Rental Car</Button>
        </div>
        <div className="mt-6 flex justify-center items-center">
          <img src={car_1} alt="car" />
        </div>
      </div>
      <div
        className="w-full h-full bg-cover bg-no-repeat bg-center rounded-[1rem] p-6 flex flex-col"
        style={{ backgroundImage: `url(${bg2})` }}
      >
        <div className="text-white lg:w-[45%] w-[70%] main_font flex flex-col gap-4">
          <h3 className=" font-semibold text-[1.7rem] ">
            Easy Way To Rent A Car At A Low Price
          </h3>
          <p>
            Ease of doing a car rental safely and reliably. Of course at a low
            price.
          </p>
          <button
            type="button"
            className="bg-[#54A6FF] py-2 px-1 text-white lg:w-[60%] font-semibold"
          >
            Rental Car
          </button>
        </div>
        <div className="mt-6 flex justify-center items-center">
          <img src={car_2} alt="car" />
        </div>
      </div>
    </div>
  );
};

export default SectionWrapper(TopSection, "");
