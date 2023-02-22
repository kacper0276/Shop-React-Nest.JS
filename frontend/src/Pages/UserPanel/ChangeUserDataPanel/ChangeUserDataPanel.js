import { useState } from "react";
import useWebsiteTitle from "../../../hooks/useWebisteTitle";
import styles from "./ChangeUserDataPanel.module.css";

export default function ChangeUserDataPanel() {
  useWebsiteTitle(
    `Zmień swoje dane ${window.localStorage.getItem("username")}`
  );

  const [userData, setUserData] = useState({
    email: `${window.localStorage.getItem("username")}`,
    password: "",
  });

  const sendUserData = (e) => {
    e.preventDefault();

    console.log(userData);
  };

  return (
    <div className={`${styles.main_container}`}>
      <div className={`${styles.form_div}`}>
        <form method="POST" className={`${styles.form}`}>
          <label className={`${styles.form_element}`}>
            <span>Nazwa użytkownika</span>
            <input type="email" name="email" value={`${userData.email}`} />
          </label>
          <label className={`${styles.form_element}`}>
            <span>Hasło</span>
            <input
              type={"password"}
              name="password"
              onChange={(e) => {
                setUserData({ ...userData, password: e.target.value });
              }}
            />
          </label>
          <button onClick={sendUserData}>Zmień dane</button>
        </form>
      </div>
    </div>
  );
}
