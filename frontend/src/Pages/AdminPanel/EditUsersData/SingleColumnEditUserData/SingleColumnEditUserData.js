import axios from "axios";
import { useState } from "react";
import { api_url } from "../../../../App";
import styles from "./SingleColumnEditUserData.module.css";

export default function SingleColumnEditUserData(props) {
  const [data, setData] = useState({
    email: ``,
    password: "",
    isActive: null,
    userType: null,
  });
  const [message, setMessage] = useState("");

  const changeUserData = async (e) => {
    e.preventDefault();

    axios
      .post(`${api_url}/adminpanel/changeuserdata/${props.id}`, data)
      .then((res) => {
        console.log(res);
        if (!res.data.message.includes("Błąd")) {
          window.location.reload();
        } else {
          setMessage(res.data.message);
        }
      });
  };

  const deleteUser = async (e) => {
    e.preventDefault();

    axios
      .post(`${api_url}/adminpanel/deleteuser/${props.id}`)
      .then((res) => {
        if (res.data.message === "Usunięto użytkownika") {
          window.location.reload();
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  };

  return (
    <tbody className={`${styles.tbody}`}>
      <tr>
        <td>{props.id}</td>
        <td>
          <input
            type={"email"}
            name="email"
            defaultValue={`${props.email}`}
            onChange={(e) => {
              setData({ ...data, email: e.target.value });
            }}
          />
        </td>
        <td>
          <input
            type={"password"}
            name="password"
            onChange={(e) => {
              setData({ ...data, password: e.target.value });
            }}
          />
        </td>
        <td>
          <label>
            <span>Tak</span>
            <input
              type={"checkbox"}
              onChange={(e) => {
                setData({ ...data, isActive: e.target.checked });
              }}
              defaultChecked={props.isActive}
            />
          </label>
        </td>
        <td>
          <select
            onChange={(e) => {
              setData({ ...data, userType: e.target.value });
            }}
            defaultValue={props.userType}
          >
            <option value={"user"}>Użytkownik</option>
            <option value={"admin"}>Admin</option>
            <option value={"worker"}>Pracownik</option>
          </select>
        </td>
        <td>
          <button
            className={`${styles.save_changes_button}`}
            onClick={changeUserData}
          >
            Zapisz zmiany
          </button>
        </td>
        <td>
          <button className={`${styles.delete_button}`} onClick={deleteUser}>
            Usuń użytownika
          </button>
        </td>
      </tr>
      {message ? (
        <div
          className={`${styles.error_container}`}
          onClick={() => {
            setMessage("");
          }}
        >
          <div className={`${styles.close_button}`}>
            <span></span>
            <span></span>
          </div>
          {message}
        </div>
      ) : null}
    </tbody>
  );
}
