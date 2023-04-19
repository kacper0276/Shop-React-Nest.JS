import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import useWebsiteTitle from "../../../hooks/useWebisteTitle";
import styles from "./OtherProducts.module.css";
import Product from "../Product/Product";
import LoadingIcon from "../../../Layout/UI/LoadingIcon/LoadingIcon";
import axios from "axios";
import { api_url } from "../../../App";

export default function OtherProducts() {
  const params = useParams();
  const location = useLocation();
  useWebsiteTitle(`Produkty kategorii: ${params.type}`);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    axios.get(`${api_url}/products/getproducts/${params.type}`).then((res) => {
      setProducts(res.data.productsList);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line
  }, [location]);

  return (
    <div className={`${styles.products_main_container}`}>
      <h1>Lista produktów kategorii: {params.type}</h1>
      <div className={`${styles.products_container}`}>
        {!loading ? (
          products.length > 0 ? (
            products.map((product, key) => {
              return <Product key={key} {...product} />;
            })
          ) : (
            <p>Brak produktów w tej kategorii</p>
          )
        ) : (
          <LoadingIcon width={"50px"} height={"50px"} />
        )}
      </div>
    </div>
  );
}
