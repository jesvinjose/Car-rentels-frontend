
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export const PrivateRoutesAdminSide = ({ Component }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const adminToken = localStorage.getItem("adminToken");

    if (!adminToken) {
      console.log("adminToken is null");
      navigate("/admin");
    }else{<Outlet/>}
  }, [navigate]);

  return (
    <div>
      <Component />
    </div>
  );
};



