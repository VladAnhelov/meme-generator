import React from "react";
import "./MemeGenerator.css";
import MemeHeader from "./components/MemeHeader.js";
import MemeMain from "./components/MemeMain.js";

function MemeGenerator() {
  return (
    <div className="container">
      <MemeHeader />
      <MemeMain />
    </div>
  );
}

export default MemeGenerator;
