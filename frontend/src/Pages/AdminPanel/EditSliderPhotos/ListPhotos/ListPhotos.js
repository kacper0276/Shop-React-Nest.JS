import { useEffect, useState } from "react";
import styles from "./ListPhotos.module.css";
import axios from "axios";
import { api_url } from "../../../../App";
import LoadingIcon from "../../../../Layout/UI/LoadingIcon/LoadingIcon";
import ListPhotosElement from "./ListPhotosElement/ListPhotosElement";

export default function ListPhotos() {
  const [photosList, setPhotosList] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchPhotos = async () => {
    axios.get(`${api_url}/adminpanel/allphotosinslider`).then((res) => {
      setPhotosList(res.data.photos);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchPhotos();
  });

  return (
    <div className={`${styles.main_div_list_photos}`}>
      <b>Lista zdjęć</b>
      {loading ? (
        <LoadingIcon />
      ) : (
        <ul className={`${styles.photos_list}`}>
          {photosList.map((photo, key) => {
            return <ListPhotosElement photo={photo} key={key} />;
          })}
        </ul>
      )}
    </div>
  );
}
