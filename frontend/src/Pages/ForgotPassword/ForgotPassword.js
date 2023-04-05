import { useState } from "react";
import useWebsiteTitle from "../../hooks/useWebisteTitle";
import styles from "./ForgotPassword.module.css";
import axios from "axios";
import { api_url } from "../../App";

export default function ForgotPassword(props) {
  useWebsiteTitle("Reset hasła");
  const [email, setEmail] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const sendEmail = async (e) => {
    e.preventDefault();

    axios
      .post(`${api_url}/authenticated/forgotpasswordsendlink/${email}`)
      .then((res) => {
        if (res.data.message === "Wysłano maila") {
          setShowMessage(true);
        }
      });
  };

  return (
    <>
      {props.showForgotPanel ? (
        <div className={`${styles.main_container}`}>
          <div className={`${styles.close_icon}`}>
            <button
              onClick={() => {
                props.setShowForgotPanel(false);
              }}
            >
              <span></span>
              <span></span>
            </button>
          </div>

          <div className={`${styles.form_div}`}>
            <p>
              Na poniżej podany email zostanie wysłana wiadomość z linkiem do
              zmiany hasła
            </p>
            <span>Podaj twój adres email: </span>
            <input
              type="email"
              name="email"
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={sendEmail}>Wyślij wiadomość</button>
            {showMessage ? (
              <div className={`${styles.message_box}`}>
                <p>wiadomość wysłana na podany email</p>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}
