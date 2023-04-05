import React from "react";
import SectionWrapper from "../../hoc/SectionWrapper";

const TopCars = () => {
  return (
    <div className="main_font mt-[-5rem]">
      <div className="flex justify-between">
        <p className="text-slate-400 main_font">Popular Car</p>
        <a href="/popular-cars" className="text-[#3563E9]">
          View All
        </a>
      </div>
      <div className="w-full flex gap-3 flex-nowrap overflow-scroll scrollbar-hide"></div>
    </div>
  );
};
export default SectionWrapper(TopCars, "Top Cars");
