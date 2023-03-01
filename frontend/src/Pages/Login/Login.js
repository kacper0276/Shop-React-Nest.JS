import useWebsiteTitle from "../../hooks/useWebisteTitle";
import styles from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import ForgotPassword from "../ForgotPassword/ForgotPassword";
import axios from "axios";
import { api_url } from "../../App";
import MainContext from "../../context/MainContext";

export default function Login() {
  useWebsiteTitle("Zaloguj się");
  const context = useContext(MainContext);
  const navigate = useNavigate();
  const [showForgotPanel, setShowForgotPanel] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const loginFunction = async (e) => {
    e.preventDefault();

    axios.post(`${api_url}/authenticated/login`, loginData).then((res) => {
      if (res.data?.message) {
        setMessage(res.data.message);
      } else {
        window.localStorage.setItem("username", res.data.username);
        context.dispatch({
          type: "change-login-status",
          userType: res.data.userType,
        });

        navigate("/");
      }
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
        {message ? (
          <div className={`${styles.error_message}`}>{message}</div>
        ) : null}
      </div>
    </main>
  );
}
