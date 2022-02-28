import React from "react";
import { Navigate } from "react-router-dom";
import CreateProjectForm from "../../components/create-project-page/CreateProjectForm";
import Navigator from "../../components/navigator";
import jwt from "jwt-decode";
import Cookies from "js-cookie";

class CreateProject extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isProjectOwner: false };
  }

  componentDidMount() {
    if (Cookies.get("token")) { // Check if token exist in Cookies (not null)
      this.setState({
        isProjectOwner: ["ProjectOwner", "Admin"].includes(
          jwt(Cookies.get("token")).role
        ),
      });
    }
  }

  render() {
    return (
      <div>
        <Navigator />
        <CreateProjectForm />
        {!this.state.isProjectOwner && <Navigate to="/home" replace={true} />}
      </div>
    );
  }
}

export default CreateProject;
