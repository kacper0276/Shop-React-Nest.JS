import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useWebsiteTitle from "../../../hooks/useWebisteTitle";
import styles from "./OtherProducts.module.css";
import Product from "../Product/Product";
import LoadingIcon from "../../../Layout/UI/LoadingIcon/LoadingIcon";

export default function OtherProducts() {
  const params = useParams();
  useWebsiteTitle(`Produkty kategorii: ${params.type}`);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setProducts([
      { id: 1, name: "TAK", price: 22, img: "product_1.JPG", alt: "OPIS" },
      { id: 2, name: "NIE", price: 100, img: "product_1.JPG", alt: "OPIS" },
      { id: 1, name: "TAK #2", price: 1202, img: "product_1.JPG", alt: "OPIS" },
      {
        id: 2,
        name: "NIE #2",
        price: 100321,
        img: "product_1.JPG",
        alt: "OPIS",
      },
    ]);
    setLoading(false);
  }, []);

  return (
    <div className={`${styles.products_main_container}`}>
      <h1>Lista produktów kategorii: {params.type}</h1>
      <div className={`${styles.products_container}`}>
        {!loading ? (
          products.map((product, key) => {
            return <Product key={key} {...product} />;
          })
        ) : (
          <LoadingIcon width={"50px"} height={"50px"} />
        )}
      </div>
    </div>
  );
}
