import { useContext } from "react";
import { Navigate } from "react-router-dom";
import MainContext from "../context/MainContext";

export default function AuthenticatedRoute({ children }) {
  const context = useContext(MainContext);

  if (context.state.userLoggin) {
    return children;
  } else {
    return <Navigate to={"/"} />;
  }
}
