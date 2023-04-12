import styles from "./UserPanelNavigation.module.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import MainContext from "../../../context/MainContext";

export default function UserPanelNavigation() {
  const context = useContext(MainContext);

  return (
    <ul className={`${styles.navigation}`}>
      <li className={`${styles.navigation_element}`}>
        <Link to={"/paneluzytkownika"}>Panel główny</Link>
      </li>
      <li className={`${styles.navigation_element}`}>
        <Link to={"/paneluzytkownika/zmiendane"}>Zmień dane konta</Link>
      </li>
      <li className={`${styles.navigation_element}`}>
        <Link to={"/paneluzytkownika/dodajaukcje"}>Dodaj aukcje</Link>
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
            <Link to={"/paneladmina/dodajkodrabatowy"}>Dodaj kod rabatowy</Link>
          </li>
          <li className={`${styles.navigation_element}`}>
            <Link to={"/paneladmina/slider"}>Dodaj zdjęcia slidera</Link>
          </li>
        </>
      ) : null}
    </ul>
  );
}
