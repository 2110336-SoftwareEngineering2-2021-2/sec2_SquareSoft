import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import OverviewVerification from '../views/verification/projectOwner/overviewVerification';
import ProjectOwnerVerification from '../views/verification/projectOwner/projectOwnerVerification';
import Home from '../views/home/Home'
import Login from '../views/login/Login'
import LoginAdmin from '../views/login/LoginAdmin'
import SignUp from '../views/registration/SignUp';
import SignUpProjectOwner from '../views/registration/SignUpProjectOwner';
import Donation from '../views/donation-system/Donation'


const MainRoutes = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="" element={<Home />}></Route>
          <Route path="home" element={<Home />}></Route>
          <Route path="login" element={<Login />}></Route>
          <Route path="admin/login" element={<LoginAdmin />}></Route>
          <Route path="admin/project-owner" element={<OverviewVerification />} />
          <Route path="admin/project-owner/specified/:id" element={<ProjectOwnerVerification />} />
          {/* <Route path="admin/transaction" element={<VerifyTransaction />} /> */}
          <Route path= "sign-up" element={<SignUp/>}/> 
          <Route path= "sign-up-projectOwner" element={<SignUpProjectOwner/>}/> 
          <Route path= "donation" element={<Donation/>}/> 
        </Routes>
    </BrowserRouter>
  );
};

export default MainRoutes;