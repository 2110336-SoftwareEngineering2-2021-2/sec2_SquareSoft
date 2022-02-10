import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import OverviewVerification from '../views/projectOwner/overviewVerification';
import ProjectOwnerVerification from '../views/projectOwner/projectOwnerVerification';

const MainRoutes = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="project-owner" element={<OverviewVerification />} />
          <Route path="project-owner/specified" element={<ProjectOwnerVerification />} />
        </Routes>
    </BrowserRouter>
  );
};

export default MainRoutes;