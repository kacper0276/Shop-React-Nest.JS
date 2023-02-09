import styles from "./ProductsDetails.module.css";
import { useParams } from "react-router-dom";
import useWebsiteTitle from "../../../hooks/useWebisteTitle";
import Slider from "../../../Layout/UI/Slider/Slider";

export default function ProductsDetails() {
  const params = useParams();
  useWebsiteTitle(`${params.id}`);

  return (
    <div className={`${styles.main_container}`}>
      <div className={`${styles.img_div}`}>
        <Slider img={["img1.JPG", "img2.JPG", "img3.JPG"]} />
        {/* <img src="../slider/img1.JPG" /> */}
      </div>
      <div className={`${styles.order_div}`}>
        <p>Nazwa</p>
        <input type="number" defaultValue={1} min={1} />
        <button className={`${styles.add_card_button}`}>
          Dodaj do koszyka
        </button>
      </div>
      <div className={`${styles.description_product}`}>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </div>
    </div>
  );
}
