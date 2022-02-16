import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import OverviewVerification from '../views/projectOwner/overviewVerification';
import ProjectOwnerVerification from '../views/projectOwner/projectOwnerVerification';
import Login from '../views/login/Login'
import SignUp from '../views/registration/SignUp';
import SignUpProjectOwner from '../views/registration/SignUpProjectOwner';
const MainRoutes = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route exact path="/login" element={<Login />}></Route>
          <Route path="project-owner" element={<OverviewVerification />} />
          <Route path="project-owner/specified" element={<ProjectOwnerVerification />} />
          <Route path= "/sign-up" element={<SignUp/>}/> 
          <Route path= "/sign-up-projectOwner" element={<SignUpProjectOwner/>}/> 
        </Routes>
    </BrowserRouter>
  );
};

export default MainRoutes;