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

  const changeUserData = async (e) => {
    e.preventDefault();

    console.log(data);

    axios
      .post(`${api_url}/adminpanel/changeuserdata/${props.id}`, data)
      .then((res) => {
        console.log(res);
      });
  };

  return (
    <tbody>
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
          >
            <option value={"user"} selected={props.userType === "user"}>
              Użytkownik
            </option>
            <option value={"admin"} selected={props.userType === "admin"}>
              Admin
            </option>
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
          <button className={`${styles.delete_button}`}>Usuń użytownika</button>
        </td>
      </tr>
    </tbody>
  );
}
