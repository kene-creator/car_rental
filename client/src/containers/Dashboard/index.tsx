import React, { useEffect, useState, useMemo, useCallback } from "react";
import Navbar from "../../components/Navbar";
import { User } from "../../typings/user";
import { useSelector } from "react-redux";

function Dashboard() {
  const [user, setUser] = useState<User>({
    id: "",
    email: "",
    emailvalid: false,
    firstName: "",
    lastName: "",
  });

  const auth = useSelector((state: any) => state.auth);
  const orderState = useSelector((state: any) => state.order);

  console.log(orderState);

  const fetchUser = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:3002/users/user", {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      });
      const userData = await response.json();
      setUser(userData);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  }, [auth.accessToken]);

  // const verifyPayment = useCallback(async () => {
  //   try {
  //     if (orderState.referenceCode && auth?.user?.id) {
  //       const requestBody = {
  //         cars: orderState.products.map((product: { id: string }) => ({
  //           id: product.id,
  //         })),
  //       };
  //       console.log("dto", JSON.stringify(requestBody.cars));

  //       const response = await fetch(
  //         `http://localhost:3002/payment/verify/${orderState.referenceCode}/${auth.user.id}`,
  //         {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: `Bearer ${auth.accessToken}`,
  //           },
  //           body: JSON.stringify(requestBody.cars),
  //         }
  //       );

  //       const verificationData = await response.json();
  //       console.log("Payment Verification:", verificationData);
  //       // Handle the payment verification response as needed
  //     }
  //   } catch (error) {
  //     console.error("Failed to verify payment:", error);
  //   }
  // }, [
  //   orderState.referenceCode,
  //   auth?.user?.id,
  //   orderState.products,
  //   auth.accessToken,
  // ]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  // useEffect(() => {
  //   verifyPayment();
  // }, [verifyPayment]);

  const renderedUserInformation = useMemo(() => {
    if (user) {
      return (
        <div>
          <h1>
            Welcome, {user.firstName} {user.lastName}
          </h1>
          <p>Email: {user.email}</p>
        </div>
      );
    }
    return null;
  }, [user]);

  return (
    <div>
      <div className="sticky top-0 z-20">
        <Navbar />
      </div>
      {renderedUserInformation}
    </div>
  );
}

export default Dashboard;
