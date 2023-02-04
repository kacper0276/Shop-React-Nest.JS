import { useRef } from "react";
import { Link } from "react-router-dom";
import styles from "./Navigation.module.css";

export default function Navigation() {
  const buttonMobile = useRef();
  const navigationList = useRef();

  const showMenu = () => {
    buttonMobile.current.classList.toggle(`${styles.active}`);
    navigationList.current.classList.toggle(`${styles.active}`);
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
        <li className={`${styles.navigation_element}`}>
          <Link to="/zaloguj" className={`${styles.navigation_link}`}>
            Logowanie
          </Link>
        </li>
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
      </ul>
    </nav>
  );
}
