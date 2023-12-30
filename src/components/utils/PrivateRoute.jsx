import React from "react";
import useStore from "../../store";

const PrivateRoute = ({ Component }) => {
  const { isLoggedIn } = useStore();

  return !isLoggedIn ? <Navigate to="/" replace /> : <Component />;
};

export default PrivateRoute;
