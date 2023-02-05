import { useEffect, useRef, useState } from "react";
import styles from "./Slider.module.css";
import LoadingIcon from "../LoadingIcon/LoadingIcon";

export default function Slider(props) {
  const [image, setImage] = useState([]);
  const [loading, setLoading] = useState(true);
  const slider = useRef();
  let i = 0;

  useEffect(() => {
    setImage(props.img);
    setLoading(false);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const changePhoto = setInterval(() => {
      // eslint-disable-next-line
      i < image.length - 1 ? i++ : (i = 0);
      slider.current.src = `./slider/transition.JPG`;

      setTimeout(() => {
        slider.current.src = `./slider/${image[i]}`;
      }, 100);
    }, 5000);

    return () => clearInterval(changePhoto);
  }, [image]);

  const nextPhoto = () => {
    i < image.length - 1 ? i++ : (i = 0);
    slider.current.src = `./slider/transition.JPG`;

    setTimeout(() => {
      slider.current.src = `./slider/${image[i]}`;
    }, 100);
  };

  const previousPhoto = () => {
    i <= 0 ? (i = image.length - 1) : i--;
    slider.current.src = `./slider/transition.JPG`;

    setTimeout(() => {
      slider.current.src = `./slider/${image[i]}`;
    }, 100);
  };

  return !loading ? (
    <div className={`${styles.slider_div}`}>
      <div className={`${styles.left_array}`}>
        <button onClick={previousPhoto}>
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
        </button>
      </div>
      <img alt="img" src={`./slider/${image[0]}`} ref={slider} />
      <div className={`${styles.right_array}`}>
        <button onClick={nextPhoto}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            fill="white"
            className="bi bi-arrow-right"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
            />
          </svg>
        </button>
      </div>
    </div>
  ) : (
    <LoadingIcon width={"50px"} height={"50px"} />
  );
}
