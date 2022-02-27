import React from "react";
import { Navigate } from "react-router-dom";
import CreateProjectForm from "../../components/create-project-page/CreateProjectForm";
import Navigator from "../../components/navigator";

class CreateProject extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isProjectOwner: false };
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
