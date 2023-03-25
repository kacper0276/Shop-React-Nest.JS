import { useRef, useState } from "react";
import useWebsiteTitle from "../../../hooks/useWebisteTitle";
import styles from "./AddAuction.module.css";

export default function AddAuction() {
  useWebsiteTitle("Dodaj aukcję");
  const errorDiv = useRef();
  const [data, setData] = useState({
    name: "",
    price: 0,
    quentity: 1,
    description: "",
    img: null,
    seller: `${window.localStorage.getItem("username")}`,
  });

  const addAuctionUser = async (e) => {
    e.preventDefault();

    console.log(data);

    errorDiv.current.classList.add(`${styles.active}`);
  };

  return (
    <div className={`${styles.main_container}`}>
      <form className={`${styles.form_add_auction}`}>
        <input
          type={"text"}
          name={"auction_name"}
          placeholder="Nazwa aukcji"
          onChange={(e) => {
            setData({ ...data, name: e.target.value });
          }}
        />
        <input
          type={"number"}
          min={0}
          name={"price"}
          onChange={(e) => {
            setData({ ...data, price: e.target.value });
          }}
        />
        <input
          type={"number"}
          min={1}
          name={"quantity"}
          onChange={(e) => {
            setData({ ...data, quentity: e.target.value });
          }}
        />
        <textarea
          placeholder="Opis aukcji"
          onChange={(e) => {
            setData({ ...data, description: e.target.value });
          }}
        />
        <input
          type={"file"}
          name="img"
          onChange={(e) => {
            setData({ ...data, img: e.target.files[0] });
          }}
        />
        <button
          className={`${styles.add_auction_button}`}
          onClick={addAuctionUser}
        >
          Dodaj aukcję
        </button>
        <div
          className={`${styles.error_div}`}
          ref={errorDiv}
          onClick={() => {
            errorDiv.current.classList.remove(`${styles.active}`);
          }}
        >
          <div className={`${styles.button_close_error_div}`}>
            <span></span>
            <span></span>
          </div>
          <p>Błąd</p>
        </div>
      </form>
    </div>
  );
}
