import { useRef, useState } from "react";
import styles from "./AddAuctionTypeForm.module.css";
import axios from "axios";
import { api_url } from "../../../../App";

export default function AddAuctionTypeForm() {
  const errorDiv = useRef();
  const [data, setData] = useState({
    name: "",
  });
  const [message, setMessage] = useState("");

  const addType = async (e) => {
    e.preventDefault();

    axios.post(`${api_url}/adminpanel/addtypeauction`, data).then((res) => {
      if (res.data.message.includes("Błąd")) {
        setMessage(res.data.message);
        errorDiv.current.classList.add(`${styles.active}`);
      } else {
        window.location.reload();
      }
    });
  };

  return (
    <form method="POST" className={`${styles.form_to_add_auction_type}`}>
      <label className={`${styles.label_in_form}`}>
        <span>Nazwa typu: </span>
        <input
          type={"text"}
          name="newAuctionType"
          onChange={(e) => {
            setData({ ...data, name: e.target.value });
          }}
        />
      </label>
      <button className={`${styles.add_type_button}`} onClick={addType}>
        Dodaj typ
      </button>
      <div className={`${styles.error_message_div}`} ref={errorDiv}>
        <div
          className={`${styles.close_button}`}
          onClick={() => {
            errorDiv.current.classList.remove(`${styles.active}`);
          }}
        >
          <span></span>
          <span></span>
        </div>
        {message}
      </div>
    </form>
  );
}
