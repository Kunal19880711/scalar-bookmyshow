import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Paths from "../constants/Paths";
import NavBar from "./NavBar";

const ProtectedRoute = ({ children }) => {
  const {user} = useSelector((store) => store.user);
  const navigate = useNavigate();

  useEffect(() => {
    if(!user) {
      navigate(Paths.Login);
    }
  }, [user]); 
  
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

