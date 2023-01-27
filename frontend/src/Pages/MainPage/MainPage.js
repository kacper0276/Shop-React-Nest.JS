import styles from "./MainPage.module.css";
import useWebisteTitle from "../../hooks/useWebisteTitle";

export default function MainPage() {
  useWebisteTitle("Strona główna");

  return (
    <main className={`${styles.main_container}`}>
      <h1>Strona główna</h1>
      <p>XD</p>
      XD
    </main>
  );
}
