import { useEffect, useState, useRef } from "react";
import styles from "./EditCodeForm.module.css";
import axios from "axios";
import { api_url } from "../../../../App";

export default function EditCodeForm(props) {
  const [data, setData] = useState({
    rabatCode: "",
    codeExpiredDate: null,
    rabatValue: 0,
    id: null,
  });
  const [message, setMessage] = useState("");
  const editCodePanel = useRef();

  const sendData = async (e) => {
    e.preventDefault();

    axios.post(`${api_url}/adminpanel/editcodedetails`, data).then((res) => {
      setMessage(res.data.message);

      if (res.data.message === "Zmieniono dane") {
        setTimeout(() => {
          setMessage("");
          editCodePanel.current.classList.remove(`${styles.active}`);

          props.fetchAllProducts();
        }, 5000);
      }
    });
  };

  useEffect(() => {
    axios
      .get(`${api_url}/adminpanel/getdetailsonecode/${props.id}`)
      .then((res) => {
        setData({
          rabatCode: res.data.codeDetails[0].code,
          codeExpiredDate: res.data.codeDetails[0].codeExpired,
          rabatValue: res.data.codeDetails[0].valueRabat,
          id: res.data.codeDetails[0].id,
        });
        editCodePanel.current.classList.add(`${styles.active}`);
      });
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <form className={`${styles.edit_code_container}`} ref={editCodePanel}>
        <label>
          <span>Jaki kod</span>
          <input
            type={"text"}
            name={"rabat"}
            onChange={(e) => {
              setData({ ...data, rabatCode: e.target.value });
            }}
            defaultValue={data.rabatCode}
          />
        </label>
        <label>
          <span>Do kiedy ważny kod</span>
          <input
            type={"datetime-local"}
            onChange={(e) => {
              setData({ ...data, codeExpiredDate: e.target.value });
            }}
          />
        </label>
        <label>
          <span>Ile % rabatu</span>
          <input
            type={"number"}
            name="Percent"
            min={1}
            max={100}
            onChange={(e) => {
              setData({ ...data, rabatValue: e.target.value });
            }}
            value={data.rabatValue}
          />
        </label>

        <button className={`${styles.send_button}`} onClick={sendData}>
          Zmień dane kodu
        </button>
      </form>
      {message ? (
        <div
          className={
            message.includes("Błąd")
              ? `${styles.error_message}`
              : `${styles.good_message}`
          }
        >
          {message}
        </div>
      ) : null}
    </>
  );
}
