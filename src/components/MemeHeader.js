import React from "react";
import { ReactComponent as ReactLogo } from "/Users/vladanhelov/Desktop/meme-generator/src/meme-logo.svg";

export default function MemeHeader() {
  return (
    <header className="header">
      <ReactLogo />
      <h2 className="header--title">Meme generator</h2>
      <h4 className="header--project">Vlad Anhelov Project</h4>
    </header>
  );
}
