import styles from "./LoadingIcon.module.css";

export default function LoadingIcon(props) {
  return (
    <div className={`${styles.main_div}`}>
      <div
        className={`${styles.loader}`}
        style={{ width: props.width || "50px", height: props.height || "50px" }}
      ></div>
    </div>
  );
}
