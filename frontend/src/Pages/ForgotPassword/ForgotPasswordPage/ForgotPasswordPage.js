import axios from "axios";
import { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api_url } from "../../../App";
import useWebsiteTitle from "../../../hooks/useWebisteTitle";
import styles from "./ForgotPasswordPage.module.css";

export default function ForgotPasswordPage() {
  useWebsiteTitle("Zresetuj hasło");
  const params = useParams();
  const navigate = useNavigate();
  const [changePasswordData, setChangePasswordData] = useState({
    email: params.username,
    password: "",
    second_password: "",
  });
  const [message, setMessage] = useState("");
  const password1 = useRef(),
    password2 = useRef(),
    img1 = useRef(),
    img2 = useRef();

  const showPassword = (e, number) => {
    e.preventDefault();

    const helpObj = {
      img1: img1.current,
      img2: img2.current,
      password1: password1.current,
      password2: password2.current,
    };

    if (helpObj[`img${number}`].src.includes("show_password_off")) {
      helpObj[`password${number}`].type = "text";
      helpObj[`img${number}`].src = "../imgUseOnPage/show_password_on.jpg";
      helpObj[`img${number}`].alt = "Show password on";
    } else {
      helpObj[`password${number}`].type = "password";
      helpObj[`img${number}`].src = "../imgUseOnPage/show_password_off.png";
      helpObj[`img${number}`].alt = "Show password off";
    }
  };

  const changePasswordFunction = (e) => {
    e.preventDefault();

    if (changePasswordData.password !== changePasswordData.second_password) {
      setMessage("Błąd! Hasła nie są takie same");
    } else {
      axios
        .post(`${api_url}/authenticated/changepassword`, changePasswordData)
        .then((res) => {
          console.log(res);
          if (res.data.message.includes("Błąd")) {
            setMessage(res.data.message);
          } else {
            navigate("/");
          }
        });
    }
  };

  return (
    <div className={`${styles.main_container}`}>
      <p>
        Reset hasła użytkownika: <b>{params.username}</b>
      </p>
      <form method="POST" className={`${styles.form_style}`}>
        <div className={`${styles.password_div}`}>
          <input
            type="password"
            name="password"
            placeholder=" "
            onChange={(e) =>
              setChangePasswordData({
                ...changePasswordData,
                password: e.target.value,
              })
            }
            ref={password1}
          />
          <span>Nowe hasło</span>
          <button
            className={`${styles.show_password}`}
            onClick={(e) => {
              showPassword(e, 1);
            }}
          >
            <img
              src="../imgUseOnPage/show_password_off.png"
              alt="Show_password_off"
              ref={img1}
            />
          </button>
        </div>
        <div className={`${styles.password_div}`}>
          <input
            type="password"
            name="password"
            placeholder=" "
            onChange={(e) =>
              setChangePasswordData({
                ...changePasswordData,
                second_password: e.target.value,
              })
            }
            ref={password2}
          />
          <span>Powtórz nowe hasło</span>
          <button
            className={`${styles.show_password}`}
            onClick={(e) => {
              showPassword(e, 2);
            }}
          >
            <img
              src="../imgUseOnPage/show_password_off.png"
              alt="Show_password_off"
              ref={img2}
            />
          </button>
        </div>

        <button
          onClick={changePasswordFunction}
          className={`${styles.send_button}`}
        >
          Zatwierdź zmianę hasła
        </button>
        {message ? (
          <div className={`${styles.error_message}`}>{message}</div>
        ) : null}
      </form>
    </div>
  );
}
