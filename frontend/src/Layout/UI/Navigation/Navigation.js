import { Link } from "react-router-dom";
import styles from "./Navigation.module.css";

export default function Navigation() {
  return (
    <nav className={`${styles.navigation}`}>
      <ul className={`${styles.navigation_list}`}>
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
        <li className={`${styles.navigation_element}`}>
          <p>Produkty</p>
          <ul>
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
