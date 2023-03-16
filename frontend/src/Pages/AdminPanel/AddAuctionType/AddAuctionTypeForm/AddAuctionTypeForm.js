import { useState } from "react";
import styles from "./AddAuctionTypeForm.module.css";

export default function AddAuctionTypeForm() {
  const [data, setData] = useState({
    name: "",
  });

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
      <button className={`${styles.add_type_button}`}>Dodaj typ</button>
      <div className={`${styles.error_message_div}`}>
        <div className={`${styles.close_button}`}>
          <span></span>
          <span></span>
        </div>
        Błąd
      </div>
    </form>
  );
}
