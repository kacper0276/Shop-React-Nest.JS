import styles from "./UserAuction.module.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useWebsiteTitle from "../../../hooks/useWebisteTitle";
import LoadingIcon from "../../../Layout/UI/LoadingIcon/LoadingIcon";
import Auction from "./Auction/Auction";
import axios from "axios";
import { api_url } from "../../../App";

export default function UserAuction() {
  useWebsiteTitle("Twoje aukcje");
  const [userAuction, setUserAuction] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState(true);

  const fetchAuction = async () => {
    axios
      .get(
        `${api_url}/userspanel/getalluserproduct/${window.localStorage.getItem(
          "username"
        )}`
      )
      .then((res) => {
        setUserAuction(res.data.auctions);
        setLoadingStatus(false);
      });
  };

  const deleteAuction = async (e, id) => {
    e.preventDefault();

    axios.post(`${api_url}/userspanel/deleteauction/${id}`).then((res) => {
      if (res.data.message === "Poprawnie usunięto!") {
        fetchAuction();
      }
    });
  };

  useEffect(() => {
    fetchAuction();
  }, []);

  return (
    <div className={`${styles.main_container}`}>
      <Link to={"/paneluzytkownika"} className={`${styles.back_arrow}`}>
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
      </Link>
      {loadingStatus ? (
        <LoadingIcon />
      ) : (
        <div className={`${styles.auction_main_container}`}>
          {userAuction.map((auction, key) => {
            return (
              <Auction {...auction} key={key} deleteAuction={deleteAuction} />
            );
          })}
        </div>
      )}
    </div>
  );
}
