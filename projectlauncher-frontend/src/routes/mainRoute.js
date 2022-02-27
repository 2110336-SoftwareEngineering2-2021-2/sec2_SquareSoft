import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import OverviewVerification from '../views/verification/projectOwner/overviewVerification';
import ProjectOwnerVerification from '../views/verification/projectOwner/projectOwnerVerification';
import Home from '../views/home/Home'
import Login from '../views/login/Login'
import LoginAdmin from '../views/login/LoginAdmin'
import SignUp from '../views/registration/SignUp';
import SignUpProjectOwner from '../views/registration/SignUpProjectOwner';
import VerifyTansaction from '../views/donation-system/admin/transactionVerification';
import ProjectListOfAnOwner from '../views/project-list/ProjectListOfAnOwner'
import CreateProject from '../views/create-project-page/CreateProject';

const MainRoutes = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="" element={<Home />}></Route>
          <Route path="home" element={<Home />}></Route>
          <Route path="login" element={<Login />}></Route>
          <Route path="projects/:ownerid" element={<ProjectListOfAnOwner />}></Route>
          <Route path="admin/login" element={<LoginAdmin />}></Route>
          <Route path="admin/project-owner" element={<OverviewVerification />} />
          <Route path="admin/project-owner/specified/:id" element={<ProjectOwnerVerification />} />
          <Route path="admin/transacntion" element={<VerifyTansaction />} />
          <Route path= "sign-up" element={<SignUp/>}/> 
          <Route path= "sign-up-projectOwner" element={<SignUpProjectOwner/>}/> 
          <Route path= "create-project" element={<CreateProject/>}/>
        </Routes>
    </BrowserRouter>
  );
};

export default MainRoutes;