import { useEffect, useRef, useState } from "react";
import styles from "./Slider.module.css";
import LoadingIcon from "../LoadingIcon/LoadingIcon";

export default function Slider(props) {
  const [image, setImage] = useState([]);
  const [loading, setLoading] = useState(true);
  const slider = useRef();

  useEffect(() => {
    setImage(props.img);
    setLoading(false);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    let i = 0;
    setInterval(() => {
      i < image.length - 1 ? i++ : (i = 0);
      slider.current.src = `./slider/transition.JPG`;

      setTimeout(() => {
        slider.current.src = `./slider/${image[i]}`;
      }, 100);
    }, 5000);
  }, [image]);

  return !loading ? (
    <div className={`${styles.slider_div}`}>
      <img alt="img" src={`./slider/${image[0]}`} ref={slider} />
    </div>
  ) : (
    <LoadingIcon width={"50px"} height={"50px"} />
  );
}
