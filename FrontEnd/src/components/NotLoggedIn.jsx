import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Paths from "../constants/Paths";

const NotLoggedIn = ({ children }) => {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.user);
  useEffect(() => {
    if (user) {
      navigate(Paths.Home);
    }
  }, [user]);
  return <>{children}</>;
};

export default NotLoggedIn;
