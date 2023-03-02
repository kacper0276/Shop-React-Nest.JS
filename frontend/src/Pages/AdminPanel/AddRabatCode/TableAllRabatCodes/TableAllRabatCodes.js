// import styles from "./TableAllRabatCodes.module.css";
import SingleCodeEditTable from "../SingleCodeEditTable/SingleCodeEditTable";

export default function TableAllRabatCodes(props) {
  return (
    <table>
      <thead>
        <tr>
          <th>Nazwa</th>
          <th>Kiedy wygasa</th>
          <th>Wartość rabatu</th>
        </tr>
      </thead>
      <tbody>
        {props.allCodeList.map((code, key) => {
          return (
            <SingleCodeEditTable
              {...code}
              key={key}
              show={props.showScreenEdit}
            />
          );
        })}
      </tbody>
    </table>
  );
}
