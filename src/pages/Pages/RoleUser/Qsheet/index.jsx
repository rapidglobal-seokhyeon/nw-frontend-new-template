import React from "react";
import BreadCrumb from "../../../../Components/Common/BreadCrumb";
import { Container } from "reactstrap";

// import List from "./CuesheetUser";
import CuesheetUser from "./CuesheetUser";

const QsheetList = () => {
  document.title = "Qsheet | 큐시트 사용자 목록";

  return (
    <React.Fragment>
      <BreadCrumb title="큐시트 목록" pageTitle="큐시트 관리" />
      <CuesheetUser />
    </React.Fragment>
  );
};

export default QsheetList;
