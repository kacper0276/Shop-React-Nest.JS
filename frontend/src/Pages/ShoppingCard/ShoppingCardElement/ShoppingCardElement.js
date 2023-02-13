import styles from "./ShoppingCardElement.module.css";

export default function ShoppingCardElement(props) {
  return (
    <div className={`${styles.main_container}`}>
      <div className={`${styles.img_product}`}>
        <img src="/slider/img1.JPG" alt="Product img" />
      </div>
      <div className={`${styles.name_product_div}`}>
        <p>{props.name}</p>
      </div>
      <div className={`${styles.product_price_details}`}>
        <p>{props.price} zł</p>
        <p>2</p>
        <div className={`${styles.delete_button_div}`}>
          <button className={`${styles.delete_button}`}>Usuń</button>
        </div>
      </div>
    </div>
  );
}
