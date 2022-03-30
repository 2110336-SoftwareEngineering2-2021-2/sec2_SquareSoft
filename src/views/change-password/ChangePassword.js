import jwtDecode from "jwt-decode";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "../../api";
import ChangePasswordForm from "../../components/change-password/ChangePasswordForm";
import Navigator from "../../components/navigator";

function ChangePassword() {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if logged in
    if (getToken()) {
        // Check if role is correct
      if (
        !["Donator", "ProjectOwner", "Admin"].includes(
          jwtDecode(getToken()).role
        )
      ) {
        navigate("/");
      }
    } else navigate("/");
  }, []);

  return (<div>
      <Navigator/>
      <ChangePasswordForm/>
  </div>)
}

export default ChangePassword;
