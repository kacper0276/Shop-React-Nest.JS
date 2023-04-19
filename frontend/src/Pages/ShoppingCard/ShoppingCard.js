import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useWebsiteTitle from "../../hooks/useWebisteTitle";
import LoadingIcon from "../../Layout/UI/LoadingIcon/LoadingIcon";
import styles from "./ShoppingCard.module.css";
import ShoppingCardElement from "./ShoppingCardElement/ShoppingCardElement";
import axios from "axios";
import { api_url } from "../../App";

export default function ShoppingCard() {
  useWebsiteTitle("Twój koszyk");
  const [productsList, setProductsList] = useState([]);
  const [productsPrice, setProductsPrice] = useState(0);
  const [loading, setLoading] = useState(true);

  const deleteFromShoppingCard = async (e, id) => {
    e.preventDefault();

    let ShoppingCardElements = JSON.parse(
      window.localStorage.getItem("shoppingCard")
    );

    ShoppingCardElements.forEach((el, index, object) => {
      if (+el.id === +id) {
        object.splice(index, 1);
      }
    });

    window.localStorage.removeItem("shoppingCard");
    window.localStorage.setItem(
      "shoppingCard",
      JSON.stringify(ShoppingCardElements)
    );
  };

  const fetchProducts = async () => {
    axios
      .post(
        `${api_url}/products/productsfromshoppingcard`,
        JSON.parse(window.localStorage.getItem("shoppingCard"))
      )
      .then((res) => {
        setProductsList(res.data.productsDetails);
      });
  };

  useEffect(() => {
    fetchProducts();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    const countPrice = async () => {
      let price = 0;
      productsList.forEach((el) => {
        JSON.parse(window.localStorage.getItem("shoppingCard")).forEach(
          (element) => {
            if (element.id === el[0].id) {
              price += el[0].price * element.quentity;
            }
          }
        );
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
              return (
                <ShoppingCardElement
                  key={key}
                  {...product}
                  deleteFromShoppingCard={deleteFromShoppingCard}
                />
              );
            })}
          </div>
          <div className={`${styles.summary_price}`}>
            {productsPrice} zł
            <hr />
            <Link
              to={"/szczegolydostawy"}
              state={{ productPrice: productsPrice, products: productsList }}
            >
              <button className={`${styles.buy_button}`}>Kupuję </button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
