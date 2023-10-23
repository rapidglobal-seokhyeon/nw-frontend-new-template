import React, { useEffect, useMemo, useState } from "react";
import { Container } from "reactstrap";
import { NavLink } from "react-router-dom";
import { Card, CardBody, CardHeader, Col } from "reactstrap";
import TableContainer from "../../../../Components/Common/TableContainer";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { getOrg } from "../../../../slices/thunks";
import { updateOrgEnabled } from "../../../../helpers/organization_helper";

const Organization = () => {
  const [enabled, setEnabled] = useState();

  const dispatch = useDispatch();

  // const selectOrgListData = createSelector((state) => state);

  const appList = useSelector((state) => state.Org.content);

  useEffect(() => {
    dispatch(getOrg());
  }, [dispatch]);

  const onClickConfirm = (e) => {
    console.log("e : ", e.target.name);
    console.log("value : ", e.target.value);
    setEnabled(!e.target.value);
    updateOrgEnabled(e.target.name, enabled);
  };

  const Status = (cell, orgSeq) => {
    // console.log("orgSeq : ", cell.row.original.orgSeq);
    return (
      <React.Fragment>
        {cell.value === true ? (
          <button
            name={cell.row.original.orgSeq}
            onClick={onClickConfirm}
            type="button"
            class="btn btn-soft-success waves-effect waves-light"
          >
            승인 완료
          </button>
        ) : (
          <button
            name={cell.row.original.orgSeq}
            value={cell.value}
            onClick={onClickConfirm}
            type="button"
            class="btn btn-soft-danger waves-effect waves-light"
          >
            진행중
          </button>
        )}
      </React.Fragment>
    );
  };

  const columns = useMemo(
    () => [
      {
        Header: "조직코드",
        Cell: (appList) => (
          <>
            <NavLink to="#" className="fw-semibold link-primary">
              {appList.row.original.orgSeq}
            </NavLink>
          </>
        ),
      },
      {
        Header: "웨딩홀 이름",
        Cell: (appList) => (
          <>
            <div className="d-flex align-items-center">
              <div className="flex-grow-1 ms-2 ">
                {appList.row.original.orgName}
              </div>
            </div>
          </>
        ),
      },
      {
        Header: "주소",
        accessor: "orgAddress",
        filterable: true,
        // Cell: (cellProps) => {
        //   return <Designation {...cellProps} />;
        // },
      },
      {
        Header: "연락처",
        accessor: "orgContact",
        filterable: true,
      },
      {
        Header: "사업자등록번호",
        accessor: "orgBiznum",
        filterable: true,
        // Cell: (cellProps) => {
        //   return <Contact {...cellProps} />;
        //   // return <div>{cellProps}</div>;
        // },
      },
      {
        Header: "가입 날짜",
        accessor: "created_at",
        filterable: true,
        // Cell: (cellProps) => {
        //   return <Type {...cellProps} />;
        //   // return <div>{cellProps}</div>;
        // },
      },
      {
        Header: "승인여부",
        accessor: "orgEnabled",
        filterable: true,
        Cell: (cellProps) => {
          const orgSeq = cellProps.row.original.orgSeq;
          // console.log(orgSeq);
          return <Status {...cellProps} orgSeq={orgSeq} />;
        },
      },
    ],
    []
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
