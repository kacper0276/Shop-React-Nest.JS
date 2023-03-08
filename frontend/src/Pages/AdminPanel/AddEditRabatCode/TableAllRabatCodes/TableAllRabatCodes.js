import SingleCodeEditTable from "../SingleCodeEditTable/SingleCodeEditTable";

export default function TableAllRabatCodes(props) {
  return (
    <table>
      <thead>
        <tr>
          <th>Nazwa</th>
          <th>Kiedy wygasa</th>
          <th>Wartość rabatu</th>
          <th>Usuń kod</th>
        </tr>
      </thead>
      <tbody>
        {props.allCodeList.map((code, key) => {
          return (
            <SingleCodeEditTable
              {...code}
              key={key}
              show={props.showScreenEdit}
              fetchAllProducts={props.fetchAllProducts}
            />
          );
        })}
      </tbody>
    </table>
  );
}
