import React from "react";
import Navbar from "../../components/Navbar";
import TopSection from "./TopSection";

export default function Homepage() {
  return (
    <div>
      <div className="sticky top-0">
        <Navbar />
      </div>
      <div className="bg-[#F6F7F9]">
        <TopSection />
      </div>
    </div>
  );
}
