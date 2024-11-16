import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Paths from "../constants/Paths";
import NavBar from "./NavBar";

const ProtectedRoute = ({ children }) => {
  const {user, initializing} = useSelector((store) => store.user);
  const navigate = useNavigate();

  useEffect(() => {
    if(initializing) {
      return;
    }
    if(!user) {
      navigate(Paths.Login);
    }
  }, [user, initializing]); 
  
  return (
    user && (
      <>
        <NavBar/>
        <div>{children}</div>
      </>
    )
  );
};

export default ProtectedRoute;

