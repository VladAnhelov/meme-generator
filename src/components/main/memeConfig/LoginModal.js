import React from "react";
import loginModalStyle from "./LoginModal.module.scss";

export default function LoginModal({ setShowModal }) {
  const handleClick = (e) => {
    setShowModal(false);
  };

  return (
    <>
      <div className={loginModalStyle.block}>
        <div className={loginModalStyle.remove_bg_modal}>
          <div className={loginModalStyle.login_warning_content}>
            <p>This feature works only if you sign up or sign in</p>
            <button className={loginModalStyle.close_btn} onClick={handleClick}>
              X
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
