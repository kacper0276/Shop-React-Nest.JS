import { Link } from "react-router-dom";
import styles from "./Product.module.css";

export default function Product(props) {
  return (
    <div className={`${styles.product_main_container}`}>
      <Link to={`/produkt/${props.id}`}>
        <div className={`${styles.img_product}`}>
          <img src={`../products/${props.img}`} alt={`${props.alt}`} />
          <p className={`${styles.price}`}>{props.price} zł</p>
        </div>
        <div className={`${styles.name_product_div}`}>
          <p>{props.name}</p>
        </div>
      </Link>
    </div>
  );
}
