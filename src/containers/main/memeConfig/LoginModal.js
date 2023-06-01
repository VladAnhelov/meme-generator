import React from "react";
import loginModalStyle from "./LoginModal.module.scss";
import NavBarMenu from "../../../components/header/NavBarMenu.js";

export default function LoginModal({ setShowModal }) {
  const handleClick = (e) => {
    setShowModal(false);
  };

  return (
    <>
      <div className={loginModalStyle.block}>
        <div className={loginModalStyle.remove_bg_modal}>
          <div className={loginModalStyle.login_warning_content}>
            <h2 className={loginModalStyle.modalText}>Sorry</h2>
            <p className={loginModalStyle.login_warning_text}>
              This feature works only if you sign up or sign in
            </p>
            <div className={loginModalStyle.login_buttons_block}>
              <NavBarMenu />
            </div>
            <button className={loginModalStyle.close_btn} onClick={handleClick}>
              X
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
