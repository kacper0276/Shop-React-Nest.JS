import styles from "./ProductsDetails.module.css";
import { useLocation, useParams } from "react-router-dom";
import useWebsiteTitle from "../../../hooks/useWebisteTitle";
// import Slider from "../../../Layout/UI/Slider/Slider";
import axios from "axios";
import { api_url } from "../../../App";
import { useEffect, useState } from "react";
import LoadingIcon from "../../../Layout/UI/LoadingIcon/LoadingIcon";

export default function ProductsDetails() {
  useWebsiteTitle(`Dane produktu`);
  const params = useParams();
  const location = useLocation();
  const [productDetails, setProductDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productDetailsAddToShoppingCard, setProductDetailsAddToShoppingCard] =
    useState({
      id: null,
      quentity: 1,
    });

  const fetchProductDetails = async () => {
    axios
      .get(`${api_url}/products/getproductdetails/${params.id}`)
      .then((res) => {
        setProductDetails(res.data.productDetails);
        setLoading(false);
        setProductDetailsAddToShoppingCard({
          ...productDetailsAddToShoppingCard,
          id: res.data.productDetails[0].id,
        });
      });
  };

  const addToShoppingCard = () => {
    if (window.localStorage.getItem("shoppingCard") === null) {
      const shoppingCardObject = [
        {
          id: productDetailsAddToShoppingCard.id,
          quentity: productDetailsAddToShoppingCard.quentity,
        },
      ];
      window.localStorage.setItem(
        "shoppingCard",
        JSON.stringify(shoppingCardObject)
      );
    } else {
      let shoppingCardObject = JSON.parse(
        window.localStorage.getItem("shoppingCard")
      );
      shoppingCardObject.push({
        id: productDetailsAddToShoppingCard.id,
        quentity: productDetailsAddToShoppingCard.quentity,
      });

      window.localStorage.removeItem("shoppingCard");
      window.localStorage.setItem(
        "shoppingCard",
        JSON.stringify(shoppingCardObject)
      );
    }
  };

  useEffect(() => {
    fetchProductDetails();
    // eslint-disable-next-line
  }, [location]);

  return (
    <div className={`${styles.main_container}`}>
      {loading ? (
        <LoadingIcon />
      ) : (
        <>
          <div className={`${styles.img_div}`}>
            {/* <Slider img={["img1.JPG", "img2.JPG", "img3.JPG"]} /> */}
            <img src={`../products/${productDetails[0].img}`} alt="Product" />
          </div>
          <div className={`${styles.order_div}`}>
            <p>{productDetails[0].name}</p>
            <p>Cena: {productDetails[0].price} zł</p>
            <input
              type="number"
              defaultValue={1}
              min={1}
              max={productDetails[0].quentity}
              onChange={(e) => {
                setProductDetailsAddToShoppingCard({
                  ...productDetailsAddToShoppingCard,
                  quentity: e.target.value,
                });
              }}
            />
            <button
              className={`${styles.add_card_button}`}
              onClick={addToShoppingCard}
            >
              Dodaj do koszyka
            </button>
          </div>
          <div className={`${styles.description_product}`}>
            {productDetails[0].description}
          </div>
        </>
      )}
    </div>
  );
}
