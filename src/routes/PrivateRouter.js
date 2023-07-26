import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import simpleLoader from "../assets/loaders/simpleLoader.gif";
import { AuthContext } from "../contexts/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user, isLoading } = useContext(AuthContext);

  const location = useLocation();
  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <img src={simpleLoader} alt="" />
      </div>
    );
  }
  if (user) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;
