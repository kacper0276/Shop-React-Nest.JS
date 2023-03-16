import { useEffect, useState } from "react";
import useWebsiteTitle from "../../../hooks/useWebisteTitle";
import styles from "./EditUsersData.module.css";
import axios from "axios";
import { api_url } from "../../../App";
import SingleColumnEditUserData from "./SingleColumnEditUserData/SingleColumnEditUserData";
import { Link } from "react-router-dom";

export default function EditUsersData() {
  useWebsiteTitle("Edytuj dane użytkowników");
  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      axios.get(`${api_url}/adminpanel/getallusers`).then((res) => {
        setUsersList(res.data.allUsersList);
      });
    };

    fetchUsers();
  }, []);

  return (
    <div className={`${styles.main_container}`}>
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
      <h1>Lista użytkowników:</h1>
      <table className={`${styles.users_table}`}>
        <thead>
          <tr>
            <th>id</th>
            <th>email</th>
            <th>hasło</th>
            <th>Aktywne konto</th>
            <th>Wybierz typ konta</th>
          </tr>
        </thead>
        {usersList.map((userData, key) => {
          return <SingleColumnEditUserData key={key} {...userData} />;
        })}
      </table>
    </div>
  );
}
