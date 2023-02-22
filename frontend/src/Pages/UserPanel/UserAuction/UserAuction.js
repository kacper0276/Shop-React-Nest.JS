import { useEffect, useState } from "react";
import useWebsiteTitle from "../../../hooks/useWebisteTitle";
import LoadingIcon from "../../../Layout/UI/LoadingIcon/LoadingIcon";
import Auction from "./Auction/Auction";
import styles from "./UserAuction.module.css";

export default function UserAuction() {
  useWebsiteTitle("Twoje aukcje");
  const [userAuction, setUserAuction] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState(true);

  useEffect(() => {
    const fetchAuction = async () => {
      setUserAuction([
        {
          name: "TAK",
          price: 22,
          img: "1.JPG",
        },
        {
          name: "TAK",
          price: 22,
          img: "1.JPG",
        },
        {
          name: "TAK",
          price: 22,
          img: "1.JPG",
        },
        {
          name: "TAK",
          price: 22,
          img: "1.JPG",
        },
        {
          name: "TAK",
          price: 22,
          img: "1.JPG",
        },
        {
          name: "TAK",
          price: 22,
          img: "1.JPG",
        },
        {
          name: "TAK",
          price: 22,
          img: "1.JPG",
        },
        {
          name: "TAK",
          price: 22,
          img: "1.JPG",
        },
        {
          name: "TAK",
          price: 22,
          img: "1.JPG",
        },
      ]);

      setLoadingStatus(false);
    };

    fetchAuction();
  }, []);

  return (
    <div className={`${styles.main_container}`}>
      {loadingStatus ? (
        <LoadingIcon />
      ) : (
        <div className={`${styles.auction_main_container}`}>
          {userAuction.map((auction, key) => {
            return <Auction {...auction} key={key} />;
          })}
        </div>
      )}
    </div>
  );
}
