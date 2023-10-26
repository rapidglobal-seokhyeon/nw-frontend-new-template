import React, { useEffect, useMemo, useState } from "react";
import { Container } from "reactstrap";
import { NavLink } from "react-router-dom";
import { Card, CardBody, CardHeader, Col } from "reactstrap";
import TableContainer from "../../../../Components/Common/TableContainer";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { getOrg } from "../../../../slices/thunks";
import { updateOrgEnabled } from "../../../../helpers/organization_helper";
import { Status } from "./TableCols";

const Organization = () => {
  const [enabled, setEnabled] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showDangerAlert, setShowDangerAlert] = useState(false);

  const dispatch = useDispatch();

  // const selectOrgListData = createSelector((state) => state);
  const selectLayoutState = (state) => state.Org
  // const appList = useSelector((state) => state.Org.content);
  // const error = useSelector((state) => state.Org.error)
  const selectLayoutProperties = createSelector(
    selectLayoutState,
    (state) => ({
      appList: state.content,
      error: state.error
    })
  )

  const {appList, error} = useSelector(selectLayoutProperties)

  useEffect(() => {
    dispatch(getOrg());
  }, [dispatch, enabled]);

  // useEffect(() => {
  //   fetchData();
  // }, [enabled]);

  const onClickSuccessClose = () => {
    setShowAlert(!showAlert)
  }

  const onClickDangerClose = () => {
    setShowDangerAlert(!showAlert)
  }

  const onClickConfirm = async (e) => {
    const updateData = e.data.find((a) => a.orgSeq === e.orgSeq);
    const application = { ...updateData, orgEnabled: !updateData.orgEnabled };
    setEnabled(!enabled);
    try {
      const response = await updateOrgEnabled(e.orgSeq, application);
      if (response === "success") {
        console.log(response.status)
        return (setShowAlert(true), dispatch(getOrg()))
      } else {
        console.log(response.status)
        return(setShowDangerAlert(true))
      }
    } catch (error) {
      console.error("Error:", error);
    }
    // updateOrgEnabled(e.orgSeq, application)
    // 
    // location.reload();
  };

  const onChangeCheckBox = (value, check) => {
    console.log("value : ", value);
    console.log("check : ", check);
    // const element = document.getElementById("email-topbar-actions");
    // const checkedCount = document.querySelectorAll(
    //   ".checkbox-wrapper-mail input:checked"
    // ).length;
    // const activeList = document.getElementById(value);
    // if (checkedCount >= 1) {
    //   element.style.display = "block";
    // } else {
    //   element.style.display = "none";
    // }
    // if (check) {
    //   activeList.classList.add("active");
    // } else {
    //   activeList.classList.remove("active");
    // }
  };

  const Status = (cell) => {
    return (
      <React.Fragment>
        {cell.value === true ? (
          <button
            name={cell.row.original.orgSeq}
            onClick={() => onClickConfirm(cell)}
            type="button"
            class="btn btn-soft-success waves-effect waves-light"
          >
            승인 완료
          </button>
        ) : (
          <button
            name={cell.row.original.orgSeq}
            value={cell.value}
            onClick={() => onClickConfirm(cell)}
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
      // {
      //   Header: "Check",
      //   Cell: (cellProps) => {
      //     // console.log(cellProps);
      //     return (
      //       <input
      //         onChange={(e) => {
      //           onChangeCheckBox(e.target.value, e.target.checked);
      //         }}
      //         className="form-check-input"
      //         type="checkbox"
      //         value={cellProps.row.original.orgSeq}
      //         id={cellProps}
      //       />
      //     );
      //   },
      // },
      {
        Header: "조직코드",
        accessor: "orgSeq",
        filterable: true,
      },
      {
        Header: "웨딩홀 이름",
        filterable: true,
        accessor: "orgName",
      },
      {
        Header: "주소",
        accessor: "orgAddress",
        filterable: true,
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
      },
      {
        Header: "승인여부",
        accessor: "orgEnabled",
        filterable: true,
        Cell: (cellProps) => {
          const orgSeq = cellProps.row.original.orgSeq;
          return <Status {...cellProps} orgSeq={orgSeq} />;
        },
      },
    ],
    []
  );
  return (
    <React.Fragment>
      <div className="page-content">
        {showAlert === true ? ( 
        <div class="alert alert-success alert-dismissible fade show" role="alert">
          <strong> 승인되었습니다! </strong> 
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={onClickSuccessClose} />
        </div>) : null}
        {showDangerAlert === true ? 
          <div class="alert alert-danger alert-dismissible fade show" role="alert">
            <strong> 승인실패! </strong> 
            <button type="button" onClick={setShowDangerAlert} class="btn-close" data-bs-dismiss="alert" aria-label="Close" />
          </div>
          : null}
        <Container fluid>
          <Col lg={12}>
            <Card>
              <CardHeader className="d-flex align-items-center border-0">
                <h5 className="card-title mb-0 flex-grow-1">조직 관리</h5>
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
