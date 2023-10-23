import React from "react";
import { Navigate } from "react-router-dom";

//Dashboard
import DashboardEcommerce from "../pages/DashboardEcommerce";

//login
import Login from "../pages/Authentication/Login";
import ForgetPasswordPage from "../pages/Authentication/ForgetPassword";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";

//pages
import Starter from "../pages/Pages/Starter/Starter";
import Maintenance from "../pages/Pages/Maintenance/Maintenance";
import ComingSoon from "../pages/Pages/ComingSoon/ComingSoon";

// User Profile
import UserProfile from "../pages/Authentication/user-profile";

import Organization from "../pages/Pages/RoleAdmin/Organization/Organization";
import Dashboard from "../pages/Pages/OrgAdmin/Dashboard/Dashboard";

import Schedule from "../pages/Pages/OrgAdmin/Schedule/Schedule";

import Calendar from "../pages/Pages/OrgAdmin/Calendar/Calendar";

import FinalTemplate from "../pages/Pages/OrgAdmin/FinalTemplate/FinalTemplate";

import FinalDocs from "../pages/Pages/OrgAdmin/FinalDocs/FinalDocs";

import Document from "../pages/Pages/OrgAdmin/Document/Document";

import Community from "../pages/Pages/OrgAdmin/Community/Community";

import Customer from "../pages/Pages/OrgAdmin/Customer/Customer";

import CuesheetTemplate from "../pages/Pages/OrgAdmin/CuesheetTemplate/CuesheetTemplate";

import Cuesheet from "../pages/Pages/OrgAdmin/Cuesheet/Cuesheet";

import CreateCuesheet from "../pages/Pages/OrgAdmin/CuesheetTemplate/CreateCuesheet";
import Employee from "../pages/Pages/OrgAdmin/Employee/Employee";
import Mypage from "../pages/Pages/OrgAdmin/Mypage/Mypage";
import DashboardUser from "../pages/Pages/RoleUser/Dashboard/DashboardUser";
import QsheetUser from "../pages/Pages/RoleUser/Qsheet/QsheetUser";
import DocumentUser from "../pages/Pages/RoleUser/Document/DocumentUser";
import CommunityUser from "../pages/Pages/RoleUser/Community/CommunityUser";
import MypageUser from "../pages/Pages/RoleUser/Mypage/MypageUser";

const authProtectedRoutes = [
  { path: "/dashboard", component: <DashboardEcommerce /> },
  { path: "/index", component: <DashboardEcommerce /> },

  //User Profile
  { path: "/profile", component: <UserProfile /> },

  //Pages
  { path: "/pages-starter", component: <Starter /> },

  // ROLE_ADMIN
  { path: "/organization", component: <Organization /> }, // 조직관리

  // ORG_ADMIN & ORG_USER
  { path: "/dashboard", component: <Dashboard /> }, // 대시보드
  { path: "/schedule", component: <Schedule /> }, // 스케줄 관리
  { path: "/calendar", component: <Calendar /> }, // 일정 관리
  { path: "/finaltempl", component: <FinalTemplate /> }, // 최종확인서 템플릿 관리
  { path: "/finaldocs", component: <FinalDocs /> }, // 최종확인서 관리
  { path: "/qsheettempl", component: <CuesheetTemplate /> }, // 큐시트 템플릿 관리
  { path: "/qsheet", component: <Cuesheet /> }, // 큐시트 관리,
  { path: "/qsheet-create", component: <CreateCuesheet /> }, // 큐시트 생성
  { path: "/document", component: <Document /> }, // 문서 관리
  { path: "/community", component: <Community /> }, // 커뮤니티
  { path: "/customer", component: <Customer /> }, // 고객 관리
  { path: "/employee", component: <Employee /> }, // 직원 관리 (ORG_USER는 제외)
  { path: "/mypage", component: <Mypage /> }, // 마이페이지

  // ROLE_USER
  { path: "/udashboard", component: <DashboardUser /> }, // 대시보드
  { path: "/uqsheet", component: <QsheetUser /> }, // 큐시트
  { path: "/udocument", component: <DocumentUser /> }, // 문서관리
  { path: "/ucommunity", component: <CommunityUser /> }, // 커뮤니티
  { path: "/umypage", component: <MypageUser /> }, // 마이페이지

  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  {
    path: "/",
    exact: true,
    component: <Navigate to="/dashboard" />,
  },
  { path: "*", component: <Navigate to="/dashboard" /> },
];

const publicRoutes = [
  // Authentication Page
  { path: "/logout", component: <Logout /> },
  { path: "/login", component: <Login /> },
  { path: "/forgot-password", component: <ForgetPasswordPage /> },
  { path: "/register", component: <Register /> },

  //AuthenticationInner pages
  { path: "/pages-maintenance", component: <Maintenance /> },
  { path: "/pages-coming-soon", component: <ComingSoon /> },
];

export { authProtectedRoutes, publicRoutes };
