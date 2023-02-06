import useWebsiteTitle from "../../../hooks/useWebisteTitle";
import styles from "./ProductsDetails.module.css";

export default function ProductsDetails(props) {
  useWebsiteTitle(`${props.name}`);

  return (
    <div>
      <p>das</p>
    </div>
  );
}
