import styles from "./LoadingIcon.module.css";

export default function LoadingIcon() {
  return (
    <div className={`${styles.main_div}`}>
      <div className={`${styles.loader}`}></div>
    </div>
  );
}
