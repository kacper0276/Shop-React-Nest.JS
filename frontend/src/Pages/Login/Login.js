import useWebsiteTitle from "../../hooks/useWebisteTitle";
import styles from "./Login.module.css";

export default function Login() {
  useWebsiteTitle("Zaloguj się");

  return (
    <main className={`${styles.main_container}`}>
      <h6>Logowanie</h6>
    </main>
  );
}
