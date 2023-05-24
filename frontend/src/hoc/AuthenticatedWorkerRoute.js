import { useContext } from "react";
import { Navigate } from "react-router-dom";
import MainContext from "../context/MainContext";

export default function AuthenticatedWorkerRoute({ children }) {
  const context = useContext(MainContext);

  if (
    context.state.userLoggin &&
    (context.state.userStatus === "worker" ||
      context.state.userStatus === "admin")
  ) {
    return children;
  } else {
    return <Navigate to={"/"} />;
  }
}
