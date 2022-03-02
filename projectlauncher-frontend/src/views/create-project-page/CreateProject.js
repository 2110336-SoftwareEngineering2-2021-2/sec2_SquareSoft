import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CreateProjectForm from "../../components/create-project-page/CreateProjectForm";
import Navigator from "../../components/navigator";
import jwt from "jwt-decode";
import Cookies from "js-cookie";

function CreateProject() {
  const navigate = useNavigate();

  useEffect(() => {
    if (Cookies.get("token")) {
      if (!["ProjectOwner", "Admin"].includes(jwt(Cookies.get("token")).role)) {
        navigate("/");
      }
    }
  }, []);

  return (
    <div>
      <Navigator />
      <CreateProjectForm />
    </div>
  );
}

export default CreateProject;
