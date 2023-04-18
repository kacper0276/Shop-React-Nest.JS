import { useEffect, useRef, useState } from "react";
import useWebsiteTitle from "../../../hooks/useWebisteTitle";
import styles from "./AddAuction.module.css";
import { Link, useNavigate } from "react-router-dom";
import { api_url } from "../../../App";
import axios from "axios";

export default function AddAuction() {
  useWebsiteTitle("Dodaj aukcję");
  const navigate = useNavigate();
  const errorDiv = useRef();
  const productTypeSelect = useRef();
  const [message, setMessage] = useState("");
  const [data, setData] = useState({
    name: "",
    price: 0,
    quentity: 1,
    description: "",
    img: null,
    seller: `${window.localStorage.getItem("username")}`,
    productType: "",
  });

  const fetchProductsType = async () => {
    axios.get(`${api_url}/adminpanel/getalltypesproducts`).then((res) => {
      setData({ ...data, productType: res.data.data[0].name });
      res.data.data.forEach((el) => {
        const option = document.createElement("option");
        option.setAttribute("value", el.name);
        option.innerText = `${el.name}`;
        productTypeSelect.current.append(option);
      });
    });
  };

  const addAuctionUser = async (e) => {
    e.preventDefault();

    const newData = new FormData();
    newData.append("name", data.name);
    newData.append("price", data.price);
    newData.append("quentity", data.quentity);
    newData.append("description", data.description);
    newData.append("img", data.img);
    newData.append("seller", data.seller);
    newData.append("productType", data.productType);

    axios.post(`${api_url}/userspanel/addauction`, newData).then((res) => {
      if (res.data.message.includes("Błąd")) {
        setMessage(res.data.message);
        errorDiv.current.classList.add(`${styles.active}`);
      } else {
        setMessage(res.data.message);
        errorDiv.current.style.background = "green";
        errorDiv.current.classList.add(`${styles.active}`);

        setTimeout(() => {
          navigate("/paneluzytkownika");
        }, 3000);
      }
    });
  };

  useEffect(() => {
    fetchProductsType();
    // eslint-disable-next-line
  }, []);

  return (
    <div className={`${styles.main_container}`}>
      <Link to={"/paneluzytkownika"} className={`${styles.back_arrow}`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="50"
          height="50"
          fill="white"
          className="bi bi-arrow-left"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
          />
        </svg>
      </Link>
      <form className={`${styles.form_add_auction}`}>
        <input
          type={"text"}
          name={"auction_name"}
          placeholder="Nazwa aukcji"
          onChange={(e) => {
            setData({ ...data, name: e.target.value });
          }}
        />
        <input
          type={"number"}
          min={0}
          name={"price"}
          placeholder="Cena w zł"
          onChange={(e) => {
            setData({ ...data, price: e.target.value });
          }}
        />
        <input
          type={"number"}
          min={1}
          name={"quantity"}
          placeholder="Ile sztuk na sprzedaż"
          onChange={(e) => {
            setData({ ...data, quentity: e.target.value });
          }}
        />
        <textarea
          placeholder="Opis aukcji"
          onChange={(e) => {
            setData({ ...data, description: e.target.value });
          }}
        />
        <input
          type={"file"}
          name="img"
          onChange={(e) => {
            setData({ ...data, img: e.target.files[0] });
          }}
        />
        <select
          ref={productTypeSelect}
          onChange={(e) => setData({ ...data, productType: e.target.value })}
        ></select>
        <button
          className={`${styles.add_auction_button}`}
          onClick={addAuctionUser}
        >
          Dodaj aukcję
        </button>
        <div
          className={`${styles.error_div}`}
          ref={errorDiv}
          onClick={() => {
            errorDiv.current.classList.remove(`${styles.active}`);
          }}
        >
          <div className={`${styles.button_close_error_div}`}>
            <span></span>
            <span></span>
          </div>
          <p>{message}</p>
        </div>
      </form>
    </div>
  );
}
