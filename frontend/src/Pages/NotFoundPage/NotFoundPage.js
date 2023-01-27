import useWebsiteTitle from "../../hooks/useWebisteTitle";
import styles from "./NotFoundPage.module.css";

export default function NotFoundPage() {
  useWebsiteTitle("Nie znaleziono strony");

  return (
    <div className={`${styles.main_container}`}>
      <h1>404</h1>
      <p>Nie znaleziono strony</p>
    </div>
  );
}
