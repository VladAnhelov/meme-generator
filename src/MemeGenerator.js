import React from "react";
import "./MemeGenerator.css";
import MemeHeader from "./components/header/MemeHeader";
import MemeMain from "./components/main/MemeMain.js";
import MemeFooter from "./components/footer/MemeFooter";

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
