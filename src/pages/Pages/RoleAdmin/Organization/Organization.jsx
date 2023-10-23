import React, { useEffect, useMemo } from "react";
import { Container } from "reactstrap";
import { NavLink } from "react-router-dom";
import { Card, CardBody, CardHeader, Col } from "reactstrap";
import TableContainer from "../../../../Components/Common/TableContainer";
import { Designation, Contact, Type, Status } from "./TableCols";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
// import { getOrganizationList } from "../../../../slices/thunks";

const Organization = () => {
  const dispatch = useDispatch();

  const selectOrgListData = createSelector(state => state);

  const appList = useSelector(selectOrgListData);

  console.log(appList);

  useEffect(() => {
    // dispatch(getOrganizationList());
    console.log(appList);
  }, [dispatch]);

  const columns = useMemo(
    () => [
      {
        Header: "Application ID",
        Cell: appList => (
          <>
            <NavLink to="#" className="fw-semibold link-primary">
              {appList.row.original.aapid}
            </NavLink>
          </>
        ),
      },
      {
        Header: "COMPANY NAME",
        Cell: appList => (
          <>
            <div className="d-flex align-items-center">
              <div className="flex-grow-1 ms-2 ">{appList.row.original.company[0]}</div>
            </div>
          </>
        ),
      },
      {
        Header: "Designation",
        accessor: "designation",
        filterable: true,
        Cell: cellProps => {
          return <Designation {...cellProps} />;
        },
      },
      {
        Header: "Apply Date",
        Cell: appList => (
          <>
            {appList.row.original.date} {/* <small className="text-muted">{appList.row.original.time}</small> */}
            <div>{appList.row.original.time}</div>
          </>
        ),
      },
      {
        Header: "Order Value",
        accessor: "orderValue",
        filterable: true,
        Cell: cellProps => {
          return <Contact {...cellProps} />;
          // return <div>{cellProps}</div>;
        },
      },
      {
        Header: "Type",
        accessor: "type",
        filterable: true,
        Cell: cellProps => {
          return <Type {...cellProps} />;
          // return <div>{cellProps}</div>;
        },
      },
      {
        Header: "Status",
        accessor: "status",
        filterable: true,
        Cell: cellProps => {
          return <Status {...cellProps} />;
          // return <div>{cellProps}</div>;
        },
      },
    ],
    [],
  );
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <div>조직관리</div>
          <Col lg={12}>
            <Card>
              <CardHeader className="d-flex align-items-center border-0">
                <h5 className="card-title mb-0 flex-grow-1">All Orders</h5>
                <div className="flex-shrink-0">
                  <div className="flax-shrink-0 hstack gap-2">
                    <button className="btn btn-primary">Today's Orders</button>
                    <button className="btn btn-soft-info">Past Orders</button>
                  </div>
                </div>
              </CardHeader>
              <CardBody>
                <TableContainer
                  columns={columns}
                  data={appList || []}
                  isGlobalFilter={true}
                  isAddUserList={false}
                  customPageSize={8}
                  className="custom-header-css"
                  divClass="table-responsive table-card mb-1"
                  tableClass="align-middle table-nowrap"
                  theadClass="table-light text-muted"
                  isApplicationFilter={true}
                />
              </CardBody>
            </Card>
          </Col>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Organization;
