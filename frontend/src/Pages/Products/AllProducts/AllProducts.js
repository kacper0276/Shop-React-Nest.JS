import useWebsiteTitle from "../../../hooks/useWebisteTitle";
import styles from "./AllProducts.module.css";

export default function AllProducts() {
  useWebsiteTitle("Wszystkie produkty");

  return (
    <div>
      <p>Wszystkie produkty</p>
    </div>
  );
}
