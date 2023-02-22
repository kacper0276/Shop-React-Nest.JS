import useWebsiteTitle from "../../hooks/useWebisteTitle";
import styles from "./Login.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import ForgotPassword from "../ForgotPassword/ForgotPassword";
import axios from "axios";
import { api_url } from "../../App";

export default function Login() {
  useWebsiteTitle("Zaloguj się");
  const [showForgotPanel, setShowForgotPanel] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const loginFunction = async (e) => {
    e.preventDefault();

    console.log(`email: ${loginData.email} password: ${loginData.password}`);

    axios.post(`${api_url}/authenticated/login`, loginData).then((res) => {
      console.log(res);
    });
  };

  return (
    <main className={`${styles.main_container}`}>
      <div className={`${styles.back_arrow}`}>
        <Link to="/">
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
      </div>
      <div className={`${styles.div_form}`}>
        <form className={`${styles.login_form}`}>
          <input
            type="email"
            name="login"
            placeholder="Podaj login"
            autoComplete="off"
            onChange={(e) => {
              setLoginData({ ...loginData, email: e.target.value });
            }}
          />
          <input
            type="password"
            name="password"
            placeholder="Podaj hasło"
            onChange={(e) => {
              setLoginData({ ...loginData, password: e.target.value });
            }}
          />
          <div className={`${styles.register_link}`}>
            <p>
              Nie masz jeszcze konta?{" "}
              <Link to="/rejestracja">Zarejestruj się</Link>
            </p>
          </div>
          <div
            className={`${styles.forgot_password}`}
            onClick={() => {
              setShowForgotPanel(true);
            }}
          >
            <p>Zapomniałeś hasła?</p>
          </div>
          {showForgotPanel ? (
            <ForgotPassword
              setShowForgotPanel={setShowForgotPanel}
              showForgotPanel={showForgotPanel}
            />
          ) : null}
          <button className={`${styles.login_button}`} onClick={loginFunction}>
            Zaloguj się
          </button>
        </form>
      </div>
    </main>
  );
}
