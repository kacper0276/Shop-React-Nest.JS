import styles from "./AddAuctionType.module.css";
import useWebsiteTitle from "../../../hooks/useWebisteTitle";
import AddAuctionTypeForm from "./AddAuctionTypeForm/AddAuctionTypeForm";
import AllAuctionTypeList from "./AllAuctionTypeList/AllAuctionTypeList";

export default function AddAuctionType() {
  useWebsiteTitle("Dodaj, usuń lub edytuj typ aukcji");

  return (
    <div className={`${styles.main_container}`}>
      <AddAuctionTypeForm />
      <AllAuctionTypeList />
    </div>
  );
}
