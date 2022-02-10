import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import OverviewVerification from '../views/projectOwner/overviewVerification';
import ProjectOwnerVerification from '../views/projectOwner/projectOwnerVerification';
import Login from '../views/login/Login'

const MainRoutes = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/project-owner-overview-verification" element={<OverviewVerification />}></Route>
          <Route exact path="/project-owner-verification" element={<ProjectOwnerVerification />} ></Route>
        </Routes>
    </BrowserRouter>
  );
};

export default MainRoutes;