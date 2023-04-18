import styles from "./ListPhotosElement.module.css";
import axios from "axios";
import { api_url } from "../../../../../App";

export default function ListPhotosElement(props) {
  const deleteImg = async (e, id) => {
    e.preventDefault();

    axios.post(`${api_url}/adminpanel/deletephotoslider/${id}`).then((res) => {
      if (res.data.message === "Poprawnie usunięto") {
        window.location.reload();
      }
    });
  };

  return (
    <>
      <li className={`${styles.list_photos_element}`}>
        <p>{props.photo.namePhoto}</p>{" "}
        <button
          onClick={(e) => {
            deleteImg(e, props.photo.id);
          }}
        >
          KLIK
        </button>
        <div className={`${styles.show_photo_hover}`}>
          <img
            src={`/slider/${[props.photo.namePhoto]}`}
            alt="Slider Element"
            width={"300px"}
            height={"25px"}
          />
        </div>
      </li>
    </>
  );
}
