import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navdata = () => {
  const history = useNavigate();
  //state data
  const [isDashboard, setIsDashboard] = useState(false);
  const [isApps, setIsApps] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [isPages, setIsPages] = useState(false);
  const [isBaseUi, setIsBaseUi] = useState(false);
  const [isAdvanceUi, setIsAdvanceUi] = useState(false);
  const [isForms, setIsForms] = useState(false);
  const [isTables, setIsTables] = useState(false);
  const [isCharts, setIsCharts] = useState(false);
  const [isIcons, setIsIcons] = useState(false);
  const [isMaps, setIsMaps] = useState(false);
  const [isMultiLevel, setIsMultiLevel] = useState(false);

  const [isFinaltempl, setIsFinaltempl] = useState(false);
  const [isQsheet, setIsQsheet] = useState(false);

  const [iscurrentState, setIscurrentState] = useState("Dashboard");

  function updateIconSidebar(e) {
    if (e && e.target && e.target.getAttribute("subitems")) {
      const ul = document.getElementById("two-column-menu");
      const iconItems = ul.querySelectorAll(".nav-icon.active");
      let activeIconItems = [...iconItems];
      activeIconItems.forEach((item) => {
        item.classList.remove("active");
        var id = item.getAttribute("subitems");
        if (document.getElementById(id))
          document.getElementById(id).classList.remove("show");
      });
    }
  }

  useEffect(() => {
    document.body.classList.remove("twocolumn-panel");
    if (iscurrentState !== "finalTempl") {
      setIsFinaltempl(false);
    }
    if (isQsheet !== "qsheet") {
      setIsQsheet(false);
    }
  }, [
    history,
    iscurrentState,
    isDashboard,
    isApps,
    isAuth,
    isPages,
    isBaseUi,
    isAdvanceUi,
    isForms,
    isTables,
    isCharts,
    isIcons,
    isMaps,
    isMultiLevel,
  ]);

  const menuItems = [
    {
      label: "ROLE_ADMIN",
      isHeader: true,
    },
    {
      id: "organization",
      label: "조직관리",
      icon: "ri-honour-line",
      link: "/organization",
      click: function (e) {
        e.preventDefault();
        setIscurrentState("Organization");
      },
    },
    {
      label: "ORG_ADMIN",
      isHeader: true,
    },
    {
      id: "dashboard",
      label: "ORG 대시보드",
      icon: "ri-honour-line",
      link: "/dashboard",
      click: function (e) {
        e.preventDefault();
        setIscurrentState("dashboard");
      },
    },
    {
      id: "schedule",
      label: "스케줄표",
      icon: "ri-honour-line",
      link: "/schedule",
      click: function (e) {
        e.preventDefault();
        setIscurrentState("schedule");
      },
    },
    {
      id: "calendar",
      label: "일정 관리",
      icon: "ri-honour-line",
      link: "/calendar",
      click: function (e) {
        e.preventDefault();
        setIscurrentState("calendar");
      },
    },
    {
      id: "finaltempl",
      label: "최종확인서",
      icon: "ri-dashboard-2-line",
      link: "/#",
      stateVariables: isFinaltempl,
      click: function (e) {
        e.preventDefault();
        setIsFinaltempl(!isFinaltempl);
        setIscurrentState("finaltempl");
        updateIconSidebar(e);
      },
      subItems: [
        {
          id: "finaltempl",
          label: "최종확인서 템플릿 관리",
          link: "/finaltempl",
          parentId: "finaltempl",
        },
        {
          id: "finaldocs",
          label: "최종확인서 관리",
          link: "/finaldocs",
          parentId: "finaltempl",
        },
      ],
    },
    {
      id: "qsheet",
      label: "큐시트",
      icon: "ri-dashboard-2-line",
      link: "/#",
      stateVariables: isQsheet,
      click: function (e) {
        e.preventDefault();
        setIsQsheet(!isQsheet);
        setIscurrentState("qsheet");
        updateIconSidebar(e);
      },
      subItems: [
        {
          id: "qsheet",
          label: "큐시트 관리",
          link: "/qsheet",
          parentId: "qsheet",
        },
        {
          id: "qsheettempl",
          label: "큐시트 템플릿 관리",
          link: "/qsheettempl",
          parentId: "qsheet",
        },
      ],
    },
    {
      id: "document",
      label: "문서 관리",
      icon: "ri-honour-line",
      link: "/document",
      click: function (e) {
        e.preventDefault();
        setIscurrentState("document");
      },
    },
    {
      id: "community",
      label: "커뮤니티",
      icon: "ri-honour-line",
      link: "/community",
      click: function (e) {
        e.preventDefault();
        setIscurrentState("community");
      },
    },
    {
      id: "customer",
      label: "고객 관리",
      icon: "ri-honour-line",
      link: "/customer",
      click: function (e) {
        e.preventDefault();
        setIscurrentState("customer");
      },
    },
    {
      id: "employee",
      label: "직원 관리",
      icon: "ri-honour-line",
      link: "/employee",
      click: function (e) {
        e.preventDefault();
        setIscurrentState("employee");
      },
    },
    {
      id: "mypage",
      label: "마이페이지",
      icon: "ri-honour-line",
      link: "/mypage",
      click: function (e) {
        e.preventDefault();
        setIscurrentState("mypage");
      },
    },
    {
      label: "ROLE_USER",
      isHeader: true,
    },
    {
      id: "udashboard",
      label: "대시보드",
      icon: "ri-honour-line",
      link: "/udashboard",
      click: function (e) {
        e.preventDefault();
        setIscurrentState("udashboard");
      },
    },
    {
      id: "uqsheet",
      label: "큐시트 관리",
      icon: "ri-honour-line",
      link: "/uqsheet",
      click: function (e) {
        e.preventDefault();
        setIscurrentState("uqsheet");
      },
    },
    {
      id: "udocument",
      label: "문서 관리",
      icon: "ri-honour-line",
      link: "/udocument",
      click: function (e) {
        e.preventDefault();
        setIscurrentState("udocument");
      },
    },
    {
      id: "ucommunity",
      label: "커뮤니티",
      icon: "ri-honour-line",
      link: "/ucommunity",
      click: function (e) {
        e.preventDefault();
        setIscurrentState("ucommunity");
      },
    },
    {
      id: "umypage",
      label: "마이페이지",
      icon: "ri-honour-line",
      link: "/umypage",
      click: function (e) {
        e.preventDefault();
        setIscurrentState("umypage");
      },
    },
  ];
  return <React.Fragment>{menuItems}</React.Fragment>;
};
export default Navdata;
