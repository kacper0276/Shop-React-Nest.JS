import { useEffect, useState } from "react";
import useWebsiteTitle from "../../../hooks/useWebisteTitle";
import styles from "./EditUsersData.module.css";
import axios from "axios";
import { api_url } from "../../../App";
import SingleColumnEditUserData from "./SingleColumnEditUserData/SingleColumnEditUserData";

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
