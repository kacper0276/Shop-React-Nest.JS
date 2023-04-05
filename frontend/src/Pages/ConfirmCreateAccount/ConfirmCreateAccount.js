import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api_url } from "../../App";
import useWebsiteTitle from "../../hooks/useWebisteTitle";
import styles from "./ConfirmCreateAccount.module.css";

export default function ConfirmCreateAccount() {
  const params = useParams();
  const navigate = useNavigate();
  const [errorsMessage, setErrorsMessage] = useState("");
  useWebsiteTitle(`Potwierdź utworzenie konta: ${params.username}`);

  const confirmCreate = async () => {
    axios
      .post(`${api_url}/authenticated/confirmaccount/${params.username}`)
      .then((res) => {
        if (res.data.message.includes("Błąd")) {
          setErrorsMessage(res.data.message);
        } else {
          setTimeout(() => {
            return navigate("/");
          }, 3000);
        }
      });
  };

  return (
    <div className={`${styles.main_container}`}>
      <h1>Witaj {params.username}</h1>
      <p>
        Już tylko jedno kliknięcie dzieli Cię od utworzenia konta na naszym
        portalu
      </p>
      <b onClick={confirmCreate}>Potwierdź kliknięciem w ten link</b>
      {errorsMessage ? (
        <div className={`${styles.error_message}`}>{errorsMessage}</div>
      ) : null}
    </div>
  );
}
