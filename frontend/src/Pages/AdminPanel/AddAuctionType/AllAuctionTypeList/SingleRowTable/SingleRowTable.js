import styles from "./SingleRowTable.module.css";
import axios from "axios";
import { api_url } from "../../../../../App";
import { useState } from "react";

export default function SingleRowTable(props) {
  const [showEditInput, setShowEditInput] = useState(false);
  const [editData, setEditData] = useState({
    id: null,
    name: "",
  });

  const deleteAuctionType = async (e) => {
    e.preventDefault();

    if (
      window.confirm(
        "Jesteś pewny? Ta akcja usunie również wszystkie aukcje o danym typie przedmiotu"
      ) === true
    ) {
      axios
        .post(`${api_url}/adminpanel/deleteauctiontype/${props.name}`)
        .then((res) => {
          if (res.data.message.includes("Błąd")) {
            console.log("Błąd");
          } else {
            window.location.reload();
          }
        });
    }
  };

  const editAuctionType = async (e) => {
    e.preventDefault();

    axios
      .post(`${api_url}/adminpanel/editauctiontype`, editData)
      .then((res) => {
        if (res.data.message) {
          window.location.reload();
        }
      });
  };

  return (
    <tbody className={`${styles.tbody}`}>
      <tr>
        <td>{props.id}</td>
        <td>{props.name}</td>
        <td>
          <button
            className={`${styles.delete_button}`}
            onClick={deleteAuctionType}
          >
            Usuń
          </button>
        </td>
        <td>
          <button
            className={`${styles.edit_button}`}
            onClick={() => {
              if (showEditInput) {
                setShowEditInput(false);
                setEditData({ ...editData, id: null });
              } else {
                setShowEditInput(true);
                setEditData({ ...editData, id: props.id });
              }
            }}
          >
            Edytuj
          </button>
        </td>
        <td>
          {showEditInput ? (
            <div className={`${styles.edit_div}`}>
              <div className={`${styles.close_icon}`}>
                <button
                  onClick={() => {
                    setShowEditInput(false);
                  }}
                >
                  <span></span>
                  <span></span>
                </button>
              </div>
              <input
                type="text"
                onChange={(e) => {
                  setEditData({ ...editData, name: e.target.value });
                }}
              />
              <button onClick={editAuctionType}>Edytuj typ aukcji</button>
            </div>
          ) : null}
        </td>
      </tr>
    </tbody>
  );
}
