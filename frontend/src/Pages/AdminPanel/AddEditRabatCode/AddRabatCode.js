import { useEffect, useState } from "react";
import styles from "./AddRabatCode.module.css";
import useWebsiteTitle from "../../../hooks/useWebisteTitle";
import axios from "axios";
import { api_url } from "../../../App";
import LoadingIcon from "../../../Layout/UI/LoadingIcon/LoadingIcon";
import TableAllRabatCodes from "./TableAllRabatCodes/TableAllRabatCodes";
import AddCodeForm from "./AddCodeForm/AddCodeForm";
import EditCodeForm from "./EditCodeForm/EditCodeForm";
import { Link } from "react-router-dom";

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
      <Link to={"/paneluzytkownika"} className={`${styles.back_arrow}`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="50"
          height="50"
          fill="white"
          className="bi bi-arrow-left"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
          />
        </svg>
      </Link>
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
