import axios from "axios";
import { useEffect, useState } from "react";
import { api_url } from "../../../../App";
import styles from "./AllAuctionTypeList.module.css";
import SingleRowTable from "./SingleRowTable/SingleRowTable";

export default function AllAuctionTypeList() {
  const [allProductsTypes, setAllProductsTypes] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAllProductsTypes = async () => {
      await axios
        .get(`${api_url}/adminpanel/getalltypesproducts`)
        .then((res) => {
          setAllProductsTypes(res.data.data);
          setLoading(false);
        });
    };
    getAllProductsTypes();
  }, []);

  return (
    <table className={`${styles.main_table}`}>
      <thead>
        <tr>
          <th>Id:</th>
          <th>Nazwa</th>
          <th>Usuń</th>
          <th>Edytuj</th>
        </tr>
      </thead>
      {loading
        ? null
        : allProductsTypes.map((product, key) => {
            return <SingleRowTable {...product} key={key} />;
          })}
    </table>
  );
}
