import styles from "./SingleRowTable.module.css";

export default function SingleRowTable(props) {
  return (
    <tbody className={`${styles.tbody}`}>
      <tr>
        <td>{props.id}</td>
        <td>{props.name}</td>
        <td>
          <button className={`${styles.delete_button}`}>Usuń</button>
        </td>
        <td>
          <button className={`${styles.edit_button}`}>Edytuj</button>
        </td>
      </tr>
    </tbody>
  );
}
