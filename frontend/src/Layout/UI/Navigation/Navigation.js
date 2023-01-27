import { Link } from "react-router-dom";
import styles from "./Navigation.module.css";

export default function Navigation() {
  return (
    <nav className={`${styles.navigation}`}>
      <ul className={`${styles.navigation_list}`}>
        <li className={`${styles.navigation_element}`}>
          <Link to="/">Strona główna</Link>
        </li>
        <li className={`${styles.navigation_element}`}>
          <Link to="/zaloguj">Logowanie</Link>
        </li>
      </ul>
    </nav>
  );
}
