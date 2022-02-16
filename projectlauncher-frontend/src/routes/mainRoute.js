import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import OverviewVerification from '../views/projectOwner/overviewVerification';
import ProjectOwnerVerification from '../views/projectOwner/projectOwnerVerification';
import Home from '../views/home/Home'
import Login from '../views/login/Login'
import LoginAdmin from '../views/login/LoginAdmin'

const MainRoutes = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="home" element={<Home />}></Route>
          <Route path="login" element={<Login />}></Route>
          <Route path="admin/login" element={<LoginAdmin />}></Route>
          <Route path="admin/project-owner" element={<OverviewVerification />} />
          <Route path="admin/project-owner/specified/:id" element={<ProjectOwnerVerification />} />
        </Routes>
    </BrowserRouter>
  );
};

export default MainRoutes;