import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./ForgotPasswordPage.module.css";

export default function ForgotPasswordPage() {
  const params = useParams();
  const [changePasswordData, setChangePasswordData] = useState({
    email: params.username,
    password: "",
    password2: "",
  });
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
                password2: e.target.value,
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
      </form>
    </div>
  );
}
