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
import ProjectListOfAnOwner from '../views/project-list/ProjectListOfAnOwner';
import MyProject from '../views/project-list/MyProject';
import Donation from '../views/donation-system/Donation'
import ProjectDetail from '../views/projectDetail/ProjectDetail';

const MainRoutes = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="" element={<Home />}></Route>
          <Route path="login" element={<Login />}></Route>
          <Route path="projects/my-project" element={<MyProject />}></Route>
          <Route path="projects/project-owner/:ownerid" element={<ProjectListOfAnOwner />}></Route>
          <Route path="admin/login" element={<LoginAdmin />}></Route>
          <Route path="admin/project-owner" element={<OverviewVerification />} />
          <Route path="admin/project-owner/specified/:id" element={<ProjectOwnerVerification />} />
          <Route path="admin/transaction" element={<VerifyTansaction />} />
          <Route path= "sign-up" element={<SignUp/>}/> 
          <Route path= "sign-up-projectOwner" element={<SignUpProjectOwner/>}/> 
          <Route path= "donation" element={<Donation/>}/> 
          <Route path= "projects/:id" element={<ProjectDetail/>}/> 
        </Routes>
    </BrowserRouter>
  );
};

export default MainRoutes;