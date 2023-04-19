import styles from "./MainPage.module.css";
import useWebisteTitle from "../../hooks/useWebisteTitle";
import Slider from "../../Layout/UI/Slider/Slider";
import { useEffect, useState } from "react";
import axios from "axios";
import { api_url } from "../../App";
import LoadingIcon from "../../Layout/UI/LoadingIcon/LoadingIcon";

export default function MainPage() {
  useWebisteTitle("Strona główna");
  const [img, setImg] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPhotos = async () => {
    await axios.get(`${api_url}/adminpanel/allphotosinslider`).then((res) => {
      setImg(res.data.photos);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  return (
    <main className={`${styles.main_container}`}>
      <div className={`${styles.slider}`}>
        {loading ? <LoadingIcon /> : <Slider img={img} />}
        <p>Strona główna</p>
      </div>
    </main>
  );
}
