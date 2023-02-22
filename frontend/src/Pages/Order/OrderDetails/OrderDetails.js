import useWebsiteTitle from "../../../hooks/useWebisteTitle";
import styles from "./OrderDetails.module.css";

export default function OrderDetails() {
  useWebsiteTitle("Szczegóły dostawy");

  return (
    <div>
      <p>TAK</p>
      <b>Nie</b>
    </div>
  );
}
