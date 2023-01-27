import { useContext } from "react";
import MainContext from "../context/MainContext";
import styles from "./Layout.module.css";

export default function Layout(props) {
  const context = useContext(MainContext);

  return (
    <div className={`${context.state.theme}`}>
      <header className={`${styles.header}`}>{props.header}</header>
      <>{props.main}</>
      <footer className={`${styles.footer}`}>{props.footer}</footer>
    </div>
  );
}
