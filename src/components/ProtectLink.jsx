import React from "react";
import Cookie from "../services/Cookie.service";
import { Navigate } from "react-router-dom";

const ProtectLink = ({ children }) => {
  const { getCookie } = Cookie();
  if (getCookie() != null) {
    return children;
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default ProtectLink;
