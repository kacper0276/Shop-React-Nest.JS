import { useState } from "react";
import styles from "./AddCodeForm.module.css";
import axios from "axios";
import { api_url } from "../../../../App";

export default function AddCodeForm() {
  const [data, setData] = useState({
    rabatCode: "",
    codeExpiredDate: null,
    rabatValue: 0,
  });
  const [message, setMessage] = useState("");

  const addRabatCode = async (e) => {
    e.preventDefault();

    axios.post(`${api_url}/adminpanel/addrabatcode`, data).then((res) => {
      setMessage(res.data.message);
    });
  };

  return (
    <form method="POST" className={`${styles.form_panel}`}>
      <label>
        <span>Jaki kod</span>
        <input
          type={"text"}
          name={"rabat"}
          onChange={(e) => {
            setData({ ...data, rabatCode: e.target.value });
          }}
        />
      </label>
      <label>
        <span>Do kiedy ważny kod</span>
        <input
          type={"datetime-local"}
          onChange={(e) => {
            setData({ ...data, codeExpiredDate: e.target.value });
          }}
        />
      </label>
      <label>
        <span>Ile % rabatu</span>
        <input
          type={"number"}
          name="Percent"
          min={1}
          max={100}
          onChange={(e) => {
            setData({ ...data, rabatValue: e.target.value });
          }}
        />
      </label>

      <button
        className={`${styles.send_button}`}
        onClick={(e) => {
          addRabatCode(e);
        }}
      >
        Zapisz kod rabatowy
      </button>
      {message ? (
        <div
          className={
            message.includes("Błąd")
              ? `${styles.error_message}`
              : `${styles.good_message}`
          }
        >
          {message}
        </div>
      ) : null}
    </form>
  );
}
