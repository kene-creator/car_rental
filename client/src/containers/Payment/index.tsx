import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import RentalSummary from "./widgets/RentalSummary";
import BillingInfo from "./widgets/BillingInfo";
import Navbar from "../../components/Navbar";
import RentalInfo from "./widgets/RentalInfo";

function PaymentPage() {
  const { carId } = useParams();
  const popularCar = useSelector((state: any) => {
    return state.popularCars.popularCars.find((car: any) => car.id === carId);
  });

  const allCars = useSelector((state: any) => {
    return state.allCars.cars.find((car: any) => car.id === carId);
  });

  const [billingInfo, setBillingInfo] = useState({
    name: "",
    phoneNumber: "",
    address: "",
    townCity: "",
  });

  const handleBillingInfoChange = (fieldName: string, value: any) => {
    setBillingInfo((prevBillingInfo) => ({
      ...prevBillingInfo,
      [fieldName]: value,
    }));
  };

  return (
    <>
      <Navbar />
      <div className="bg-[#F6F7F9] w-full">
        <div className="flex flex-col-reverse lg:flex-row gap-6 justify-center p-8">
          <form className="basis-[70%] flex flex-col gap-5">
            <BillingInfo
              billingInfo={billingInfo}
              onBillingInfoChange={handleBillingInfoChange}
            />
            <RentalInfo />
          </form>
          <div>
            {popularCar && (
              <RentalSummary
                thumbnailSrc={popularCar.thumbnailSrc}
                name={popularCar.name}
                dailyPrice={popularCar.dailyPrice}
              />
            )}
            {allCars && (
              <RentalSummary
                thumbnailSrc={allCars.thumbnailSrc}
                name={allCars.name}
                dailyPrice={allCars.dailyPrice}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default PaymentPage;
