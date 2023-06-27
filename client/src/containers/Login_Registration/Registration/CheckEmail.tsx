import React from "react";
import { Typography, Button } from "@mui/material";
import mail from "../../../assets/images/mail.png";

const CheckEmail = () => {
  const handleOpenEmail = () => {
    window.location.href = "https://mail.google.com";
  };

  return (
    <div className="flex flex-col items-center justify-center h-full main_font px-6">
      <div>
        <Typography
          variant="h4"
          component="h1"
          className="text-center mb-4 font-bold"
        >
          Verify your email
        </Typography>
      </div>
      <div>
        <img src={mail} alt="mail letter" />
      </div>

      <div className="flex flex-col gap-8 items-center justify-center">
        <Typography variant="body1" className="text-center mb-8">
          An email has been sent to your email address. Please check your inbox
          and follow the instructions to verify your account. If you have not
          recieved the mail after a few minutes, please check your spam folder.
        </Typography>
        <Button variant="contained" color="primary" onClick={handleOpenEmail}>
          Open Email
        </Button>
      </div>
    </div>
  );
};

export default CheckEmail;
