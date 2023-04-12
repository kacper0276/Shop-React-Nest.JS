import styles from "./EditSliderPhotos.module.css";
import useWebsiteTitle from "../../../hooks/useWebisteTitle";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { api_url } from "../../../App";

export default function EditSliderPhotos() {
  useWebsiteTitle("Edytuj slider");
  const [data, setData] = useState({
    img: null,
  });
  const [message, setMessage] = useState("");

  const add_photo = async (e) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("img", data.img);

    axios.post(`${api_url}/adminpanel/addphotoslider`, formdata).then((res) => {
      setMessage(res.data.message);
    });
  };

  return (
    <div className={`${styles.main_div}`}>
      <Link to={"/paneluzytkownika"} className={`${styles.back_arrow}`}>
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

      <form
        method="POST"
        encType="multipart/form-data"
        className={`${styles.add_photo_form}`}
      >
        <input
          type="file"
          onChange={(e) => {
            setData({ img: e.target.files[0] });
          }}
        />

        <button className={`${styles.add_button}`} onClick={add_photo}>
          Dodaj zdjęcie do slidera
        </button>
      </form>
      {message ? (
        <div className={`${styles.message_div}`}>
          <div className={`${styles.close_icon}`}>
            <button
              onClick={() => {
                setMessage("");
              }}
            >
              <span></span>
              <span></span>
            </button>
          </div>
          {message}
        </div>
      ) : null}
    </div>
  );
}
