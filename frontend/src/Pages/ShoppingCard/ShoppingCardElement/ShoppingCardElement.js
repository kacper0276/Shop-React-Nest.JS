import styles from "./ShoppingCardElement.module.css";

export default function ShoppingCardElement(props) {
  return (
    <div className={`${styles.main_container}`}>
      <div className={`${styles.img_product}`}>
        <img src={`products/${props[0].img}`} alt="Product img" />
      </div>
      <div className={`${styles.name_product_div}`}>
        <p>{props[0].name}</p>
      </div>
      <div className={`${styles.product_price_details}`}>
        <p>{props[0].price} zł</p>
        {JSON.parse(window.localStorage.getItem("shoppingCard")).map(
          (el, key) => {
            if (el.id == props[0].id) {
              return <p key={key}>{el.quentity} sztuki/a</p>;
            }
          }
        )}
        <div className={`${styles.delete_button_div}`}>
          <button
            className={`${styles.delete_button}`}
            onClick={(e) => {
              props.deleteFromShoppingCard(e, props[0].id);
            }}
          >
            Usuń
          </button>
        </div>
      </div>
    </div>
  );
}
