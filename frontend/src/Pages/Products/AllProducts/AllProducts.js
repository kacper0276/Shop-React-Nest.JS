import { useEffect, useState } from "react";
import useWebsiteTitle from "../../../hooks/useWebisteTitle";
import Product from "../Product/Product";
import LoadingIcon from "../../../Layout/UI/LoadingIcon/LoadingIcon";
import styles from "./AllProducts.module.css";

export default function AllProducts() {
  useWebsiteTitle("Wszystkie produkty");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setProducts([
      { id: 1, name: "TAK", price: 22, img: "product_1.JPG", alt: "OPIS" },
      { id: 2, name: "NIE", price: 100, img: "product_1.JPG", alt: "OPIS" },
    ]);
    setLoading(false);
  }, []);

  return (
    <div className={`${styles.products_main_container}`}>
      <h1>Wszystkie produkty</h1>
      <div className={`${styles.products_container}`}>
        {!loading ? (
          products.map((product, key) => {
            return <Product key={key} {...product} />;
          })
        ) : (
          <LoadingIcon />
        )}
      </div>
    </div>
  );
}
