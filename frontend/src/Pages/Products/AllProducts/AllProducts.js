import { useEffect, useState } from "react";
import useWebsiteTitle from "../../../hooks/useWebisteTitle";
import Product from "../Product/Product";
import LoadingIcon from "../../../Layout/UI/LoadingIcon/LoadingIcon";
import styles from "./AllProducts.module.css";
import axios from "axios";
import { api_url } from "../../../App";

export default function AllProducts() {
  useWebsiteTitle("Wszystkie produkty");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllProducts = async () => {
    axios.get(`${api_url}/products/allproductslist`).then((res) => {
      setProducts(res.data.allProducts);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchAllProducts();
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
