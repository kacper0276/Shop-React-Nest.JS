import styles from "./SingleRowTable.module.css";

export default function SingleRowTable(props) {
  return (
    <tbody className={`${styles.tbody}`}>
      <tr>
        <td>TAK</td>
        <td>NIE</td>
      </tr>
    </tbody>
  );
}
