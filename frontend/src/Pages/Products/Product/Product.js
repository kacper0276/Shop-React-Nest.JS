import styles from "./Product.module.css";

export default function Product(props) {
  return (
    <div>
      <p>Nazwa</p>
      <p>Ilość</p>
      <input type={"number"} />
      <button>Kup teraz</button>
    </div>
  );
}
