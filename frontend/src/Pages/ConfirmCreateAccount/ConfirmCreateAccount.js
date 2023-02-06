import { useNavigate, useParams } from "react-router-dom";
import useWebsiteTitle from "../../hooks/useWebisteTitle";
import styles from "./ConfirmCreateAccount.module.css";

export default function ConfirmCreateAccount() {
  const params = useParams();
  const navigate = useNavigate();
  useWebsiteTitle(`Potwierdź utworzenie konta: ${params.username}`);

  const confirmCreate = async () => {
    return navigate("/");
  };

  return (
    <div className={`${styles.main_container}`}>
      <h1>Witaj {params.username}</h1>
      <p>
        Już tylko jedno kliknięcie dzieli Cię od utworzenia konta na naszym
        portalu
      </p>
      <p onClick={confirmCreate}>Potwierdź kliknięciem w ten link</p>
    </div>
  );
}
