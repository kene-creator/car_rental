import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { Snackbar } from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

import RentalSummary from "./widgets/RentalSummary";
import BillingInfo from "./widgets/BillingInfo";
import Navbar from "../../components/Navbar";
import RentalInfo from "./widgets/RentalInfo";
import PaymentMethod from "./widgets/PaymentMethod";
import Confirmation from "./widgets/Confirmation";
import Footer from "../../components/footer/index";
import PaymentButton from "../../components/PaymentButton";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function PaymentPage() {
  const { carId } = useParams();
  const popularCar = useSelector((state: any) => {
    return state.popularCars.popularCars.find((car: any) => car.id === carId);
  });
  const allCars = useSelector((state: any) => {
    return state.allCars.cars.find((car: any) => car.id === carId);
  });
  const rentalInfo = useSelector((state: any) => state.rentalInfo);
  const auth = useSelector((state: any) => state.auth);
  const order = useSelector((state: any) => state.order);

  const navigate = useNavigate();

  const [billingInfo, setBillingInfo] = useState({
    name: "",
    phoneNumber: "",
    address: "",
    townCity: "",
    email: "",
  });

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  const [newsletterConfirmed, setNewsletterConfirmed] = useState(false);
  const [privacyPolicyAccepted, setPrivacyPolicyAccepted] = useState(false);

  const [rentalInfoState, setRentalInfoState] = useState<boolean>(false);

  const [openAlert, setOpenAlert] = useState<boolean>(false);

  const handleNewsletterConfirmation = () => {
    setNewsletterConfirmed(!newsletterConfirmed);
  };

  const handlePrivacyPolicyAcceptance = () => {
    setPrivacyPolicyAccepted(!privacyPolicyAccepted);
  };

  const handleBillingInfoChange = (fieldName: string, value: any) => {
    setBillingInfo((prevBillingInfo) => ({
      ...prevBillingInfo,
      [fieldName]: value,
    }));
  };

  const handlePaymentMethodChange = (paymentMethod: string) => {
    setSelectedPaymentMethod(paymentMethod);
  };

  const isButtonDisabled =
    !billingInfo.name ||
    !billingInfo.phoneNumber ||
    !selectedPaymentMethod ||
    !privacyPolicyAccepted;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const hasRentalInfo = Object.values(rentalInfo).some(
      (value) => value === null || value === ""
    );
    setRentalInfoState(hasRentalInfo);

    if (hasRentalInfo) return;

    if (selectedPaymentMethod === "Paystack") {
      try {
        const amount = allCars?.dailyPrice || popularCar?.dailyPrice || "0";

        const payload = {
          initializeDto: {
            amount: `${amount * 100}`,
            email: auth.user?.email,
          },
          cars: order.products,
        };

        const response = await fetch(
          `http://localhost:3002/payment/initialize/${auth.user?.id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${auth?.accessToken}`,
            },
            body: JSON.stringify(payload),
          }
        );

        if (response.ok) {
          const data = await response.json();

          window.open(data.data.authorization_url, "_blank");
        } else if (response.statusText === "Unauthorized") {
          setOpenAlert(true);
          setTimeout(() => {
            setOpenAlert(false);
            navigate("/login");
          }, 3000);
        } else {
          throw new Error("Failed to initialize the transaction");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <Navbar />
      <Snackbar
        open={openAlert}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          Please login to continue
        </Alert>
      </Snackbar>

      <div className="bg-[#F6F7F9] w-full">
        <div className="flex flex-col-reverse lg:flex-row gap-6 justify-center p-8">
          <form
            className="basis-[70%] flex flex-col gap-5 relative"
            onSubmit={handleSubmit}
          >
            <BillingInfo
              billingInfo={billingInfo}
              onBillingInfoChange={handleBillingInfoChange}
            />
            <RentalInfo
              rentalInfo={rentalInfo}
              rentalInfoState={rentalInfoState}
            />
            <PaymentMethod
              selectedPaymentMethod={selectedPaymentMethod}
              onPaymentMethodChange={handlePaymentMethodChange}
            />
            <Confirmation
              newsletterConfirmed={newsletterConfirmed}
              onNewsletterConfirmation={handleNewsletterConfirmation}
              privacyPolicyAccepted={privacyPolicyAccepted}
              onPrivacyPolicyAcceptance={handlePrivacyPolicyAcceptance}
            />
            <PaymentButton disabled={isButtonDisabled} />
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
      <Footer />
    </>
  );
}

export default PaymentPage;
