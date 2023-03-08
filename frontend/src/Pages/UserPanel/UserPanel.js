import { useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import MainContext from "../../context/MainContext";
import useWebsiteTitle from "../../hooks/useWebisteTitle";
import styles from "./UserPanel.module.css";

export default function UserPanel() {
  useWebsiteTitle("Panel użytkownika");
  const context = useContext(MainContext);
  const sideMenu = useRef();
  const mainPanel = useRef();
  const showMenuButton = useRef();

  const showMenu = () => {
    sideMenu.current.classList.toggle(`${styles.active}`);
    mainPanel.current.classList.toggle(`${styles.active}`);
    showMenuButton.current.classList.toggle(`${styles.active}`);
  };

  useEffect(() => {
    window.localStorage.setItem("username", "kacper@xd.pl");
  }, []);

  return (
    <div className={`${styles.main_container}`}>
      <div className={`${styles.side_menu}`} ref={sideMenu}>
        <ul className={`${styles.navigation}`}>
          <li className={`${styles.navigation_element}`}>
            <Link to={"/paneluzytkownika"}>Panel główny</Link>
          </li>
          <li className={`${styles.navigation_element}`}>
            <Link to={"/paneluzytkownika/zmiendane"}>Zmień dane konta</Link>
          </li>
          <li className={`${styles.navigation_element}`}>
            <Link to={"/paneluzytkownika/twojeaukcje"}>Twoje aukcje</Link>
          </li>
          {context.state.userStatus === "admin" ? (
            <>
              <li className={`${styles.navigation_element}`}>
                <Link to={"/paneladmina/typyaukcji"}>Dodaj typ aukcji</Link>
              </li>
              <li className={`${styles.navigation_element}`}>
                <Link to={"/paneladmina/edytujuzytkownikow"}>
                  Edytuj użytkowników
                </Link>
              </li>
              <li className={`${styles.navigation_element}`}>
                <Link to={"/paneladmina/dodajkodrabatowy"}>
                  Dodaj kod rabatowy
                </Link>
              </li>
              <li className={`${styles.navigation_element}`}>
                <Link to={"/paneladmina/dodajzdjeciaslidera"}>
                  Dodaj zdjęcia slidera
                </Link>
              </li>
            </>
          ) : null}
        </ul>
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
