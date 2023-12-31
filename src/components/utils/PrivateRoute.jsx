import React from "react";
import useStore from "../../store";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ Component }) => {
  const { isLoggedIn } = useStore();

  return !isLoggedIn ? <Navigate to="/" replace /> : <Component />;
};

export default PrivateRoute;
