import React from "react";
import guard from "../../../assets/icons/ic-security-safety.png";

interface ConfirmationProps {
  newsletterConfirmed: boolean;
  onNewsletterConfirmation: () => void;
  privacyPolicyAccepted: boolean;
  onPrivacyPolicyAcceptance: () => void;
}

function Confirmation({
  newsletterConfirmed,
  onNewsletterConfirmation,
  privacyPolicyAccepted,
  onPrivacyPolicyAcceptance,
}: ConfirmationProps) {
  return (
    <div className="bg-white rounded-lg p-5 main_font">
      <div className="pb-8">
        <h3 className="font-bold text-[1.3rem]">Confirmation</h3>
        <div className="text-[#90A3BF] flex justify-between items-center gap-4 text-[0.8rem] lg:text-[1rem]">
          <p>
            We are getting to the end. Just a few clicks and your rental is
            ready !
          </p>
          <p>Step 4 of 4</p>
        </div>
      </div>
      <div className="flex items-center mb-4 py-3 px-6 bg-[#F6F7F9] rounded-lg">
        <input
          type="checkbox"
          id="newsletter"
          checked={newsletterConfirmed}
          onChange={onNewsletterConfirmation}
          className="w-5 h-5 rounded"
        />
        <label htmlFor="newsletter" className="ml-2 text-[0.8rem] font-medium">
          I agree with sending an Marketing and newsletter emails. No spam,
          promissed!
        </label>
      </div>
      <div className="flex items-center mb-4 py-3 px-6 bg-[#F6F7F9] rounded-lg">
        <input
          type="checkbox"
          id="privacyPolicy"
          checked={privacyPolicyAccepted}
          onChange={onPrivacyPolicyAcceptance}
          className="w-5 h-5 rounded"
        />
        <label
          htmlFor="privacyPolicy"
          className="ml-2 text-[0.8rem] font-medium"
        >
          I agree with our terms and conditions and privacy policy.
        </label>
      </div>
      <div className="mt-20">
        <img src={guard} alt="safety shield" />
        <h4 className="font-medium text-[0.8rem] mt-3">
          All your data are safe
        </h4>
        <p className="text-[0.7rem] text-[#90A3BF] mt-3">
          We are using the most advanced security to provide you the best
          experince ever.
        </p>
      </div>
    </div>
  );
}

export default Confirmation;
