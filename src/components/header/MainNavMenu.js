import React, { useContext } from "react";
import style from "./MainNavMenu.module.scss";
import { ThemeContext } from "../../utils/ThemeContext.js";
import AboutModal from "./AboutModal.js";
import PricingModal from "./PricingModal.js";

export default function MainNavMenu({ onAboutClick, onPricingClick }) {
  const [showAboutModal, setShowAboutModal] = React.useState(false);
  const [showPricingModal, setShowPricingModal] = React.useState(false);

  return (
    <>
      {" "}
      <div className={style.mainNavMenu}>
        <ul className={style.mainNavMenu_ul}>
          {showAboutModal && (
            <AboutModal
              show={showAboutModal}
              onClose={() => setShowAboutModal(false)}
            />
          )}
          {showPricingModal && (
            <PricingModal
              show={showPricingModal}
              onClose={() => setShowPricingModal(false)}
            />
          )}
          <li className={style.mainNavMenu_list}>
            <button
              className={style.mainNavMenu_list_button}
              onClick={onAboutClick}
            >
              <span>About</span>
            </button>
          </li>

          <li className={style.mainNavMenu_list}>
            <button
              className={style.mainNavMenu_list_button}
              onClick={onPricingClick}
            >
              <span>Pricing</span>{" "}
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}
