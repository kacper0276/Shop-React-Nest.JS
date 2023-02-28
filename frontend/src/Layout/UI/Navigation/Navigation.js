import { useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import IconInNavigation from "../IconInNavigation/IconInNavigation";
import styles from "./Navigation.module.css";
import MainContext from "../../../context/MainContext";

export default function Navigation() {
  const context = useContext(MainContext);
  const navigate = useNavigate();
  const buttonMobile = useRef();
  const navigationList = useRef();

  const showMenu = () => {
    buttonMobile.current.classList.toggle(`${styles.active}`);
    navigationList.current.classList.toggle(`${styles.active}`);
  };

  const logOutFunction = (e) => {
    e.preventDefault();

    window.localStorage.removeItem("username");
    context.dispatch({ type: "change-login-status" });
    navigate("/");
  };

  return (
    <nav className={`${styles.navigation}`}>
      <div
        className={`${styles.button_mobile}`}
        ref={buttonMobile}
        onClick={showMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={`${styles.navigation_list}`} ref={navigationList}>
        <li className={`${styles.navigation_element}`}>
          <Link to="/" className={`${styles.navigation_link}`}>
            Strona główna
          </Link>
        </li>
        {context.state.userLoggin ? (
          <>
            <li className={`${styles.navigation_element}`}>
              <Link
                className={`${styles.navigation_link}`}
                onClick={(e) => {
                  logOutFunction(e);
                }}
              >
                Wyloguj
              </Link>
            </li>
            <li className={`${styles.navigation_element}`}>
              <Link
                to={"/paneluzytkownika"}
                className={`${styles.navigation_link}`}
              >
                Twój panel
              </Link>
            </li>
          </>
        ) : (
          <li className={`${styles.navigation_element}`}>
            <Link to="/zaloguj" className={`${styles.navigation_link}`}>
              Logowanie
            </Link>
          </li>
        )}
        <li
          className={`${styles.navigation_element} ${styles.main_element_list}`}
        >
          <p>Produkty</p>
          <ul className={`${styles.main_list}`}>
            <li>
              <Link
                to="/produkty/wszystkie"
                className={`${styles.navigation_link}`}
              >
                Wszystkie produkty
              </Link>
            </li>
            <li>
              <Link
                to="/produkty/książki"
                className={`${styles.navigation_link}`}
              >
                Książki
              </Link>
            </li>
            <li>
              <Link
                to="/produkty/płyty"
                className={`${styles.navigation_link}`}
              >
                Płyty
              </Link>
            </li>
          </ul>
        </li>
        <li className={`${styles.navigation_element}`}>
          <IconInNavigation />
        </li>
      </ul>
    </nav>
  );
}
