import React, { useContext } from "react";
import style from "./MainNavMenu.module.scss";
import { ThemeContext } from "../main/ThemeContext.js";
import AboutModal from "./AboutModal.js";

export default function MainNavMenu() {
  const { isDarkTheme } = useContext(ThemeContext); // Використовуйте контекст тут
  const [showAboutModal, setShowAboutModal] = React.useState(false);

  const headerNameStyle = {
    color: isDarkTheme ? "black" : "white", // Змініть ці кольори на ті, які ви хочете використовувати для темної та світлої тем
  };

  const handleClick = () => {
    setShowAboutModal((prevShow) => !prevShow);
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
          <li className={style.mainNavMenu_list}>
            <button
              className={style.mainNavMenu_list_button}
              style={headerNameStyle}
              onClick={handleClick}
            >
              <span>About</span>
            </button>
          </li>

          <li className={style.mainNavMenu_list}>
            <button
              className={style.mainNavMenu_list_button}
              style={headerNameStyle}
            >
              <span>Pricing</span>{" "}
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}
