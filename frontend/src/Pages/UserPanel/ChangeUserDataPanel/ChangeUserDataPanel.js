import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
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
      <Link to={"/paneluzytkownika"} className={`${styles.back_arrow}`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="50"
          height="50"
          fill="white"
          className="bi bi-arrow-left"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
          />
        </svg>
      </Link>
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
