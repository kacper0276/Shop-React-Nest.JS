import { useEffect, useState } from "react";
import useWebsiteTitle from "../../hooks/useWebisteTitle";
import LoadingIcon from "../../Layout/UI/LoadingIcon/LoadingIcon";
import styles from "./ShoppingCard.module.css";
import ShoppingCardElement from "./ShoppingCardElement/ShoppingCardElement";

export default function ShoppingCard() {
  useWebsiteTitle("Twój koszyk");
  const [productsList, setProductsList] = useState([]);
  const [productsPrice, setProductsPrice] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setTimeout(() => {
        setProductsList([
          { id: 1, name: "TAK", price: 43, img: "product_1.JPG", alt: "OPIS" },
          { id: 2, name: "NIE", price: 300, img: "product_1.JPG", alt: "OPIS" },
          {
            id: 1,
            name: "TAK #2",
            price: 200,
            img: "product_1.JPG",
            alt: "OPIS",
          },
          {
            id: 2,
            name: "NIE #2",
            price: 100,
            img: "product_1.JPG",
            alt: "OPIS",
          },
          { id: 1, name: "TAK", price: 43, img: "product_1.JPG", alt: "OPIS" },
          { id: 2, name: "NIE", price: 300, img: "product_1.JPG", alt: "OPIS" },
          {
            id: 1,
            name: "TAK #2",
            price: 200,
            img: "product_1.JPG",
            alt: "OPIS",
          },
          {
            id: 2,
            name: "NIE #2",
            price: 100,
            img: "product_1.JPG",
            alt: "OPIS",
          },
        ]);
      }, 2000);
    };

    fetchProducts();

    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    const countPrice = async () => {
      let price = 0;
      productsList.forEach((el) => {
        price += el.price;
      });
      setProductsPrice(price);
    };

    countPrice();
    setLoading(false);
  }, [productsList]);

  return (
    <>
      {loading ? (
        <LoadingIcon />
      ) : (
        <div className={`${styles.main_container}`}>
          <div className={`${styles.summary_product_list}`}>
            {productsList.map((product, key) => {
              return <ShoppingCardElement key={key} {...product} />;
            })}
          </div>
          <div className={`${styles.summary_price}`}>
            {productsPrice} zł
            <hr />
            <button className={`${styles.buy_button}`}>Kupuję</button>
          </div>
        </div>
      )}
    </>
  );
}
