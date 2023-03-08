import axios from "axios";
import { api_url } from "../../../../App";
import styles from "./SingleCodeEditTable.module.css";

export default function SingleCodeEditTable(props) {
  const deleteRabatCode = async (id) => {
    axios.get(`${api_url}/adminpanel/deleterabatcode/${id}`).then((res) => {
      props.fetchAllProducts();
    });
  };

  return (
    <tr>
      <td
        className={`${styles.border_table}`}
        onClick={() => {
          props.show(props.id);
        }}
      >
        {props.code}
      </td>
      <td className={`${styles.border_table}`}>{props.codeExpired}</td>
      <td className={`${styles.border_table}`}>{props.valueRabat}</td>
      <td className={`${styles.border_table}`}>
        <button
          className={`${styles.delete_button}`}
          onClick={() => deleteRabatCode(props.id)}
        >
          Usuń
        </button>
      </td>
    </tr>
  );
}
