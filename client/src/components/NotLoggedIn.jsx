import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Paths from "../constants/Paths";

const NotLoggedIn = ({ children }) => {
  const navigate = useNavigate();
  const { user, initializing } = useSelector((store) => store.user);
  useEffect(() => {
    if(initializing) {
      return;
    }
    if (user) {
      navigate(Paths.Home);
    }
  }, [user, initializing]);
  return <>{children}</>;
};

export default NotLoggedIn;
