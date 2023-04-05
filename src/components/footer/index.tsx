import React from "react";
import SectionWrapper from "../../hoc/SectionWrapper";

const Footer = () => {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between main_font flex-col lg:flex-row pb-6 border-b border-b-slate-400">
        <div className="basis[50%]">
          <div>
            <h3 className="main_font font-bold text-[2rem] text-[#3563E9]">
              MORENT
            </h3>
            <p className="w-[85%] lg:w-[55%] mt-6">
              Our vision is to provide convenience and help increase your sales
              business.
            </p>
          </div>
        </div>
        <div>
          <div className="flex justify-between items-center gap-12 flex-wrap lg:gap-16 mt-8 lg:mt-0">
            <div>
              <h3 className="font-bold">About</h3>
              <ul className="flex flex-col gap-3 mt-4">
                <li>
                  <a href="/" className="text-[0.7rem] text-[#90A3BF]">
                    How it works
                  </a>
                </li>
                <li>
                  <a href="/" className="text-[0.7rem] text-[#90A3BF]">
                    Featured
                  </a>
                </li>
                <li>
                  <a href="/" className="text-[0.7rem] text-[#90A3BF]">
                    Partnership
                  </a>
                </li>
                <li>
                  <a href="/" className="text-[0.7rem] text-[#90A3BF]">
                    Business Relation
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold">Community</h3>
              <ul className="flex flex-col gap-3 mt-4">
                <li>
                  <a href="/" className="text-[0.7rem] text-[#90A3BF]">
                    Events
                  </a>
                </li>
                <li>
                  <a href="/" className="text-[0.7rem] text-[#90A3BF]">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="/" className="text-[0.7rem] text-[#90A3BF]">
                    Podcast
                  </a>
                </li>
                <li>
                  <a href="/" className="text-[0.7rem] text-[#90A3BF]">
                    Invite a friend
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold">Social</h3>
              <ul className="flex flex-col gap-3 mt-4">
                <li>
                  <a href="/" className="text-[0.7rem] text-[#90A3BF]">
                    Discord
                  </a>
                </li>
                <li>
                  <a href="/" className="text-[0.7rem] text-[#90A3BF]">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="/" className="text-[0.7rem] text-[#90A3BF]">
                    Facebook
                  </a>
                </li>
                <li>
                  <a href="/" className="text-[0.7rem] text-[#90A3BF]">
                    Twitter
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between pt-6 main_font flex-col lg:flex-row gap-6 lg:gap-0 items-center">
        <div>
          <p className="text-sm font-semibold">
            ©2022MORENT.All rights reserved
          </p>
        </div>
        <div className="flex gap-8">
          <p className="text-sm font-semibold">Privacy Policy</p>
          <p className="text-sm font-semibold">Terms of Service</p>
        </div>
      </div>
    </div>
  );
};

export default SectionWrapper(Footer, "footer");
