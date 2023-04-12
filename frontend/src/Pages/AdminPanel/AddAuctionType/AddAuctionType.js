import styles from "./AddAuctionType.module.css";
import useWebsiteTitle from "../../../hooks/useWebisteTitle";
import AddAuctionTypeForm from "./AddAuctionTypeForm/AddAuctionTypeForm";
import AllAuctionTypeList from "./AllAuctionTypeList/AllAuctionTypeList";
import { Link } from "react-router-dom";

export default function AddAuctionType() {
  useWebsiteTitle("Dodaj, usuń lub edytuj typ aukcji");

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
      <AddAuctionTypeForm />
      <AllAuctionTypeList />
    </div>
  );
}
