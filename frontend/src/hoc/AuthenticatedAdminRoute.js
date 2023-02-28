import { useContext } from "react";
import { Navigate } from "react-router-dom";
import MainContext from "../context/MainContext";

export default function AuthenticatedAdminRoute({ children }) {
  const context = useContext(MainContext);

  if (context.state.userLoggin && context.state.userStatus) {
    return children;
  } else {
    return <Navigate to={"/"} />;
  }
}
