import { useParams } from "react-router-dom";
import useWebsiteTitle from "../../../hooks/useWebisteTitle";
import styles from "./OtherProducts.module.css";

export default function OtherProducts() {
  const params = useParams();
  useWebsiteTitle(`Produkty kategorii: ${params.type}`);

  return (
    <div>
      <p>dasd</p>
    </div>
  );
}
