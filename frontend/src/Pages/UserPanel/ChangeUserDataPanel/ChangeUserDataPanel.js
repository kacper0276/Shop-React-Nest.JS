import axios from "axios";
import { useState } from "react";
import { api_url } from "../../../App";
import useWebsiteTitle from "../../../hooks/useWebisteTitle";
import styles from "./ChangeUserDataPanel.module.css";

export default function ChangeUserDataPanel() {
  useWebsiteTitle(
    `Zmień swoje dane ${window.localStorage.getItem("username")}`
  );

  const [userData, setUserData] = useState({
    email: ``,
    password: "",
  });
  const [message, setMessage] = useState("");

  const sendUserData = (e) => {
    e.preventDefault();

    axios
      .post(
        `${api_url}/userspanel/edituserdata/${window.localStorage.getItem(
          "username"
        )}`,
        userData
      )
      .then((res) => {
        setMessage(res.data.message);
      });
  };

  return (
    <div className={`${styles.main_container}`}>
      <div className={`${styles.form_div}`}>
        <form method="POST" className={`${styles.form}`}>
          <label className={`${styles.form_element}`}>
            <span>Nazwa użytkownika</span>
            <input
              type="email"
              name="email"
              defaultValue={`${window.localStorage.getItem("username")}`}
              onChange={(e) => {
                setUserData({ ...userData, email: e.target.value });
              }}
            />
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
          <button
            className={`${styles.send_data_button}`}
            onClick={sendUserData}
          >
            Zmień dane
          </button>
        </form>
        {message ? (
          <>
            <div
              className={
                message.includes("Błąd")
                  ? `${styles.error_message}`
                  : `${styles.good_message}`
              }
            >
              {message}
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
