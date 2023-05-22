import React from "react";
import NavBarMenu from "../../header/NavBarMenu";
import loginModalStyle from "./LoginModal.module.scss";

export default function LoginModal() {
  return (
    <div className={loginModalStyle.block}>
      <p>This feature works only if you </p>
      <NavBarMenu />
    </div>
  );
}
