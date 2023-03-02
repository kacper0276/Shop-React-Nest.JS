import { useEffect, useState } from "react";
import styles from "./AddRabatCode.module.css";
import useWebsiteTitle from "../../../hooks/useWebisteTitle";
import axios from "axios";
import { api_url } from "../../../App";
import LoadingIcon from "../../../Layout/UI/LoadingIcon/LoadingIcon";
import TableAllRabatCodes from "./TableAllRabatCodes/TableAllRabatCodes";
import AddCodeForm from "./AddCodeForm/AddCodeForm";

export default function AddRabatCode() {
  useWebsiteTitle("Dodaj kod rabatowy");

  const [loading, setLoading] = useState(true);
  const [allCodeList, setAllCodeList] = useState([]);

  const showScreenEdit = (value) => {
    console.log(value);
    // Pokazujesz ekran jak fetchujesz wszystkie dane tego id
  };

  useEffect(() => {
    const fetchAllProducts = async () => {
      await axios.get(`${api_url}/adminpanel/getallrabatcode`).then((res) => {
        setAllCodeList(res.data.allCodes);
        setLoading(false);
      });
    };

    fetchAllProducts();
  }, []);

  return (
    <div className={`${styles.main_container}`}>
      <AddCodeForm />
      <div className={`${styles.all_codes_list}`}>
        {loading ? (
          <LoadingIcon />
        ) : (
          <TableAllRabatCodes
            allCodeList={allCodeList}
            showScreenEdit={showScreenEdit}
          />
        )}
      </div>
    </div>
  );
}
