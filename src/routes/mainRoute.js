import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import OverviewVerification from '../views/verification/projectOwner/overviewVerification';
import Home from '../views/home/Home'
import Login from '../views/login/Login'
import LoginAdmin from '../views/login/LoginAdmin'
import SignUp from '../views/registration/SignUp';
import SignUpProjectOwner from '../views/registration/SignUpProjectOwner';
import TransactionVerification from '../views/donation-system/admin/transactionVerification';
import ProjectListOfAnOwner from '../views/project-list/ProjectListOfAnOwner';
import MyProject from '../views/project-list/MyProject';
import Donation from '../views/donation-system/Donation'
import ProjectDetail from '../views/projectDetail/ProjectDetail';
import CreateProject from '../views/create-project-page/CreateProject';
import UpdateProjectProgression from '../views/projectDetail/update-project-progresion';
import AdminProjectList from '../views/project-list/AdminProjectList';
import AdminHome from '../views/home/Home-admin';
import ChangePassword from '../views/change-password/ChangePassword';
import Deposit from '../views/donation-system/Deposit'
import Withdraw from '../views/donation-system/Withdraw'
import WithdrawProjectOwner from '../views/donation-system/WithdrawProjectOwner'
import EditProjectDetail from '../views/EditProjectDetail/EditProjectDetail'
const MainRoutes = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="" element={<Home />}></Route>
          <Route path="home" element={<Home />}></Route>
          <Route path="login" element={<Login />}></Route>
          <Route path="projects/my-project" element={<MyProject />}></Route>
          <Route path="projects/project-owner/:ownerid" element={<ProjectListOfAnOwner />}></Route>
          <Route path="projects/:id" element={<ProjectDetail/>}/> 
          <Route path="projects/update-progression/:id" element={<UpdateProjectProgression/>}/> 
          <Route path="admin/login" element={<LoginAdmin />}></Route>
          <Route path="admin/home" element={<AdminHome />}></Route>
          <Route path="admin/project-owner" element={<OverviewVerification />} />
          <Route path="admin/transaction" element={<TransactionVerification />} />
          <Route path="admin/projects" element={<AdminProjectList />} />
          <Route path= "sign-up" element={<SignUp/>}/> 
          <Route path= "sign-up-projectOwner" element={<SignUpProjectOwner/>}/> 
          <Route path= "create-project" element={<CreateProject/>}/>
          <Route path= "donation" element={<Donation/>}/> 
          <Route path= "donation/deposit" element={<Deposit/>}/> 
          <Route path= "donation/withdraw" element={<Withdraw/>}/> 
          <Route path= "donation/withdrawProjectOwner" element={<WithdrawProjectOwner/>}/> 
          <Route path= "projects/editProjects/:id" element={<EditProjectDetail/>}/> 
          
          <Route path="change-password" element={<ChangePassword/>}/>
          <Route path = "personal-details" element = {<PersonalDetails/>}/>
        </Routes>
    </BrowserRouter>
  );
};

export default MainRoutes;