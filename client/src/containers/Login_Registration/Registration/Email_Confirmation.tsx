import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setEmailVerified } from "../../../app/auth_state";
import happy from "../../../assets/images/happy.png";

const EmailConfirmation: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useParams<{ token: string }>();
  const registrationAccessToken = useSelector(
    (state: any) => state.auth.registrationAccessToken
  );

  const handleConfirmation = async () => {
    try {
      const response = await fetch(
        `http://localhost:3002/auth/email/verify/${token}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${registrationAccessToken}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        dispatch(setEmailVerified(data.valid));
        navigate("/login");
      } else {
        // Email verification failed
        console.error("Email confirmation failed:", response.statusText);
      }
    } catch (error) {
      // Handle any errors
      console.error("Email confirmation failed:", error);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col items-center justify-center main_font w-[90%] md:w-[50%] my-4 py-5 px-6 bg-slate-300 rounded-2xl">
        <div className="flex items-center justify-center basis-[40%]">
          <img src={happy} alt="happy person" className="h-[70%]" />
        </div>
        <div className="flex flex-col items-center justify-center gap-4 md:gap-8 basis-[60%]">
          <h2 className="text-[1.5rem] font-bold">Email Confirmation</h2>
          <p className="text-[1rem] font-medium text-center">
            Thanks for signing up. Click the button below to confirm your email:
          </p>
          <button
            onClick={handleConfirmation}
            className="px-6 py-2 rounded-md text-white font-semibold bg-gradient-to-r from-blue-300 to-blue-500 hover:from-blue-400 hover:to-blue-600"
            style={{
              background: "linear-gradient(to right, #68DDE3, #5D9CEC)",
            }}
          >
            Confirm Email
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailConfirmation;
