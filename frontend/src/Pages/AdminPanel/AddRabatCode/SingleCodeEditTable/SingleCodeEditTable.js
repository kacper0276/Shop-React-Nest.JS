import styles from "./SingleCodeEditTable.module.css";

export default function SingleCodeEditTable(props) {
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
    </tr>
  );
}
