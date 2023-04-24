import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useWebsiteTitle from "../../../hooks/useWebisteTitle";
import styles from "./OrderSetting.module.css";
import axios from "axios";
import { api_url } from "../../../App";

export default function OrderSetting() {
  useWebsiteTitle("Wybierz szczegóły dostawy");
  const location = useLocation();
  const [rabatCode, setRabatCode] = useState("");
  const [actualRabat, setActualRabat] = useState(0);
  const [priceProducts, setProductsPrice] = useState(0);
  const [priceWithoutDelivery, setPriceWithoutDelivery] = useState(0);
  const [orderData, setOrderData] = useState({
    deliveryType: null,
    products: location.state.products,
    price: 0,
    orderDetails: [window.localStorage.getItem("shoppingCard")],
    deliveryAdres: {
      email: "",
      name: "",
      lastName: "",
      phone: "",
    },
  });

  const setDeliveryType = (e) => {
    const typeDelivery = e.target.value;
    const actualPrice = priceWithoutDelivery;

    switch (typeDelivery) {
      case "Odbiór osobisty":
        setProductsPrice(actualPrice + 0);
        setOrderData({
          ...orderData,
          deliveryType: typeDelivery,
          price: actualPrice,
        });
        break;
      case "Kurier":
        setProductsPrice(actualPrice + 20);
        setOrderData({
          ...orderData,
          deliveryType: typeDelivery,
          price: priceProducts + 20,
        });
        break;
      case "Poczta":
        setProductsPrice(actualPrice + 10);
        setOrderData({
          ...orderData,
          deliveryType: typeDelivery,
          price: actualPrice + 10,
        });
        break;
      default:
        console.log(`Brak typu dostawy: ${typeDelivery}`);
    }
  };

  const checkRabatCode = async (e) => {
    e.preventDefault();

    axios.post(`${api_url}/products/checkrabatcode`, rabatCode).then((res) => {
      if (isNaN(res.data.message)) {
        console.log("Błąd");
      } else {
        setProductsPrice(priceProducts * (res.data.message / 100));
        setActualRabat(res.data.message);
      }
    });
  };

  const sendOrder = (e) => {
    e.preventDefault();

    console.log(orderData);
  };

  useEffect(() => {
    setProductsPrice(location.state.productPrice);
    setPriceWithoutDelivery(location.state.productPrice);
    // eslint-disable-next-line
  }, []);

  return (
    <div className={`${styles.main_container}`}>
      <form method="POST" className={`${styles.form_order}`}>
        <div className={`${styles.order_delivery_adres}`}>
          <input
            type="text"
            placeholder="Imie"
            name="imie"
            onChange={(e) => {
              setOrderData({
                ...orderData,
                deliveryAdres: {
                  ...orderData.deliveryAdres,
                  name: e.target.value,
                },
              });
            }}
          />
          <input
            type="text"
            placeholder="Nazwisko"
            name="nazwisko"
            onChange={(e) => {
              setOrderData({
                ...orderData,
                deliveryAdres: {
                  ...orderData.deliveryAdres,
                  lastName: e.target.value,
                },
              });
            }}
          />
          <input
            type="email"
            placeholder="email"
            name="email"
            onChange={(e) => {
              setOrderData({
                ...orderData,
                deliveryAdres: {
                  ...orderData.deliveryAdres,
                  email: e.target.value,
                },
              });
            }}
          />
          <input
            type="text"
            placeholder="123456789"
            name="numer telefonu"
            minLength="9"
            maxLength="9"
            onChange={(e) => {
              setOrderData({
                ...orderData,
                deliveryAdres: {
                  ...orderData.deliveryAdres,
                  phone: e.target.value,
                },
              });
            }}
          />
        </div>
        <div className={`${styles.order_delivery_type}`}>
          <label>
            <input
              type="radio"
              name="dellivery"
              value={"Odbiór osobisty"}
              onClick={setDeliveryType}
            />
            <span>Odbiór osobisty</span>
          </label>
          <label>
            <input
              type="radio"
              name="dellivery"
              value={"Kurier"}
              onClick={setDeliveryType}
            />
            <span>Kurier</span>
          </label>
          <label>
            <input
              type="radio"
              name="dellivery"
              value={"Poczta"}
              onClick={setDeliveryType}
            />
            <span>Poczta</span>
          </label>
        </div>
        <div className={`${styles.delivery_code}`}>
          <label>
            <span>Kod rabatowy</span>
            {actualRabat ? (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setActualRabat(0);
                }}
              >
                Usuń kod rabatowy
              </button>
            ) : (
              <>
                <input
                  type="text"
                  name="rabatCode"
                  onChange={(e) => {
                    setRabatCode(e.target.value);
                  }}
                />
                <button
                  onClick={(e) => {
                    checkRabatCode(e);
                  }}
                >
                  Sprawdź kod rabatowy
                </button>
              </>
            )}
          </label>
        </div>
      </form>
      <div className={`${styles.delivery_result}`}>
        {priceProducts} zł
        <hr />
        <button
          onClick={(e) => {
            sendOrder(e);
          }}
        >
          Zamawiam i płacę{" "}
        </button>
      </div>
    </div>
  );
}
