import React from "react";
import Navbar from "../../components/Navbar";
import TopSection from "./TopSection";
import PickDrop from "./PickDrop";
import TopCars from "./TopCars";

export default function Homepage() {
  return (
    <div>
      <div className="sticky top-0 z-20">
        <Navbar />
      </div>
      <div className="bg-[#F6F7F9]">
        <TopSection />
        <PickDrop />
        <TopCars />
      </div>
    </div>
  );
}
