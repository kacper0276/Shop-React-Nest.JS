import { useEffect, useState } from "react";
import styles from "./AddRabatCode.module.css";
import useWebsiteTitle from "../../../hooks/useWebisteTitle";
import axios from "axios";
import { api_url } from "../../../App";
import LoadingIcon from "../../../Layout/UI/LoadingIcon/LoadingIcon";
import TableAllRabatCodes from "./TableAllRabatCodes/TableAllRabatCodes";
import AddCodeForm from "./AddCodeForm/AddCodeForm";
import EditCodeForm from "./EditCodeForm/EditCodeForm";

export default function AddRabatCode() {
  useWebsiteTitle("Dodaj kod rabatowy");

  const [loading, setLoading] = useState(true);
  const [allCodeList, setAllCodeList] = useState([]);
  const [idEditedCode, setIdEditedCode] = useState(null);

  const showScreenEdit = (id) => {
    setIdEditedCode(id);
  };

  const fetchAllProducts = async () => {
    await axios.get(`${api_url}/adminpanel/getallrabatcode`).then((res) => {
      setAllCodeList(res.data.allCodes);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <div className={`${styles.main_container}`}>
      <AddCodeForm fetchAllProducts={fetchAllProducts} />
      <div className={`${styles.all_codes_list}`}>
        {loading ? (
          <LoadingIcon />
        ) : (
          <TableAllRabatCodes
            allCodeList={allCodeList}
            showScreenEdit={showScreenEdit}
            fetchAllProducts={fetchAllProducts}
          />
        )}
        {idEditedCode ? (
          <EditCodeForm id={idEditedCode} fetchAllProducts={fetchAllProducts} />
        ) : null}
      </div>
    </div>
  );
}
