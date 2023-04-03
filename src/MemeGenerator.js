import React from "react";
import "./MemeGenerator.css";
import MemeHeader from "./components/MemeHeader.js";
import MemeMain from "./components/MemeMain.js";
import MemeFooter from "./components/MemeFooter";

function MemeGenerator() {
  return (
    <div className="container">
      <MemeHeader />
      <MemeMain />
      <MemeFooter />
    </div>
  );
}

export default MemeGenerator;
