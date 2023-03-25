import { useRef } from "react";
import useWebsiteTitle from "../../hooks/useWebisteTitle";
import styles from "./UserPanel.module.css";
import UserPanelNavigation from "./UserPanelNavigation/UserPanelNavigaion";

export default function UserPanel() {
  useWebsiteTitle("Panel użytkownika");
  const sideMenu = useRef();
  const mainPanel = useRef();
  const showMenuButton = useRef();

  const showMenu = () => {
    sideMenu.current.classList.toggle(`${styles.active}`);
    mainPanel.current.classList.toggle(`${styles.active}`);
    showMenuButton.current.classList.toggle(`${styles.active}`);
  };

  return (
    <div className={`${styles.main_container}`}>
      <div className={`${styles.side_menu}`} ref={sideMenu}>
        <UserPanelNavigation />
      </div>
      <div className={`${styles.main_panel}`} ref={mainPanel}>
        <button
          className={`${styles.show_menu_button}`}
          onClick={showMenu}
          ref={showMenuButton}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            fill="white"
            className="bi bi-arrow-left"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
            />
          </svg>
        </button>
        <p>Reszta ekranu</p>
      </div>
    </div>
  );
}
