import React from "react";
import "./MemeGenerator.scss";
import MemeHeader from "./components/header/MemeHeader.js";
import MemeMain from "./components/main/MemeMain.js";
import MemeFooter from "./components/footer/MemeFooter.js";

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
