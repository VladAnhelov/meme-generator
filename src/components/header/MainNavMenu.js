import React, { useContext } from "react";
import style from "./MainNavMenu.module.scss";
import { ThemeContext } from "../main/ThemeContext.js";
import AboutModal from "./AboutModal.js";
import PricingModal from "./PricingModal.js";

export default function MainNavMenu() {
  const { isDarkTheme } = useContext(ThemeContext); // Використовуйте контекст тут
  const [showAboutModal, setShowAboutModal] = React.useState(false);
  const [showPricingModal, setShowPricingModal] = React.useState(false);

  const headerNameStyle = {
    color: isDarkTheme ? "black" : "white", // Змініть ці кольори на ті, які ви хочете використовувати для темної та світлої тем
  };

  const handleAboutClick = () => {
    setShowAboutModal((prevShow) => !prevShow);
  };

  const handlePricingClick = () => {
    setShowPricingModal((prevShow) => !prevShow);
  };

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
              style={headerNameStyle}
              onClick={handleAboutClick}
            >
              <span>About</span>
            </button>
          </li>

          <li className={style.mainNavMenu_list}>
            <button
              className={style.mainNavMenu_list_button}
              style={headerNameStyle}
              onClick={handlePricingClick}
            >
              <span>Pricing</span>{" "}
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}
