import styles from "./WorkerPanel.module.css";
import useWebsiteTitle from "../../hooks/useWebisteTitle";
import OrdersToDo from "./OrdersToDo/OrdersToDo";
import OrdersInProgress from "./OrdersInProgress/OrdersInProgress";
import CompletedOrders from "./CompletedOrders/CompletedOrders";
import { useEffect, useState } from "react";
import axios from "axios";
import { api_url } from "../../App";

export default function WorkerPanel() {
  useWebsiteTitle("Panel pracownika");
  const [ordersToDoList, setOrdersToDoList] = useState([]);
  const [ordersInProgressList, setOrdersInProgressList] = useState([]);
  const [ordersCompleted, setOrdersCompleted] = useState([]);

  const fetchOrdersToDo = async () => {
    axios.get(`${api_url}/workerpanel/getorderstodo`).then((res) => {
      console.log(res);
    });
  };

  const fetchOrdersInProgress = async () => {
    axios.get(`${api_url}/workerpanel/getordersinprogress`).then((res) => {
      console.log(res);
    });
  };

  const fetchOrdersCompleted = async () => {
    axios.get(`${api_url}/workerpanel/getcompletedorders`).then((res) => {
      console.log(res);
    });
  };

  useEffect(() => {
    fetchOrdersToDo();
    fetchOrdersInProgress();
    fetchOrdersCompleted();
  }, []);

  return (
    <div className={`${styles.main_container}`}>
      <div className={`${styles.order_list}`}>
        <b>Zamówienia do wykonania</b>
        <OrdersToDo />
      </div>
      <div className={`${styles.order_list}`}>
        <b>Zamówienia w trakcie kompletowania</b>
        <OrdersInProgress />
      </div>
      <div className={`${styles.order_list}`}>
        <b>Zamówienia wykonane</b>
        <CompletedOrders />
      </div>
    </div>
  );
}
