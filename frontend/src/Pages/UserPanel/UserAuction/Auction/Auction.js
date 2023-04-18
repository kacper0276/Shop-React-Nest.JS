import styles from "./Auction.module.css";

export default function Auction(props) {
  return (
    <div className={`${styles.main_container}`}>
      <div className={`${styles.div_img}`}>
        <img src={`../products/${props.img}`} alt="Product" />
      </div>
      <div className={`${styles.div_name}`}>{props.name}</div>
      <div className={`${styles.div_price}`}>{props.price} zł</div>
      <div className={`${styles.div_button}`}>
        <button className={`${styles.delete_button}`}>Usuń</button>
      </div>
    </div>
  );
}
