import styles from "./MainPage.module.css";
import useWebisteTitle from "../../hooks/useWebisteTitle";
import Slider from "../../Layout/UI/Slider/Slider";

export default function MainPage() {
  useWebisteTitle("Strona główna");

  return (
    <main className={`${styles.main_container}`}>
      <Slider img={["img1.JPG", "img2.JPG", "img3.JPG"]} />
      <p>Strona główna</p>
    </main>
  );
}
