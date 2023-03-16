import styles from "./AllAuctionTypeList.module.css";
import SingleRowTable from "./SingleRowTable/SingleRowTable";

export default function AllAuctionTypeList() {
  return (
    <table className={`${styles.main_table}`}>
      <thead>
        <tr>
          <th>Id:</th>
          <th>Nazwa</th>
        </tr>
      </thead>
      <SingleRowTable />
    </table>
  );
}
