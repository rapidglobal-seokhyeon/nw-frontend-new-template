import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  Modal,
  ModalHeader,
  ModalBody,
  Input,
  CardBody,
  Card,
  Label,
  Row,
} from "reactstrap";
import TableContainer from "@components/Common/TableContainer";

//import action
import {
  getQsheetLogList as onGetQsheetHistoryList,
  deleteQsheetList as onDeleteQsheetList,
} from "../../../../../slices/thunks";
import { createSelector } from "reselect";
import BreadCrumb from "@components/Common/BreadCrumb";
import { Link, useNavigate } from "react-router-dom";

const CuesheetLog = () => {
  const dispatch = useDispatch();

  const selectQsheetData = createSelector(
    (state) => state.Qsheet.qsheetLogList,
    (qsheetLogList) => qsheetLogList
  );
  // Inside your component
  const qsheetLogList = useSelector(selectQsheetData);
  console.log(qsheetLogList);

  const orgSeqList = qsheetLogList.map((data) => data?.orgSeq);
  console.log(orgSeqList);
  console.info("qsheetLogList", qsheetLogList);
  const [qsheet, setQsheet] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(onGetQsheetHistoryList());
  }, [dispatch]);

  useEffect(() => {
    setQsheet(qsheetLogList);
  }, [qsheetLogList]);

  const [modal, setModal] = useState(false);

  const toggle = () => {
    console.log(modal);

    if (modal) {
      setModal(false);
    } else {
      setModal(true);
    }
  };

  const toggleEdit = (e) => {
    console.log(e);

    // if (modal) {
    //   setModal(false);
    // } else {
    //   setModal(true);
    // }
  };

  const columns = useMemo(
    () => [
      {
        Header: "수정내용",
        accessor: "content",
        filterable: true,
        Cell: (cell) => {
          console.info("cell.row.original", cell.row.original.content);
          return (
            <div>
              {cell.row.original.content?.map((data) => (
                <div>{data.content}</div>
              ))}
            </div>
          );
        },
      },
      {
        Header: "수정자 이름",
        accessor: "user.userName",
        filterable: true,
      },
      {
        Header: "수정일 ",
        accessor: "updated_at",
        filterable: false,
      },
    ],
    []
  );
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="큐시트 수정내역" pageTitle="큐시트 수정내역" />
          <Row className="g-4 mb-3">
            <div className="col-sm-3 ms-auto">
              <div className="d-flex justify-content-sm-end gap-2">
                <div className="search-box ms-2 col-sm-7">
                  <Input
                    type="text"
                    className="form-control"
                    placeholder="검색어를 입력해주세요."
                  />
                  <i className="ri-search-line search-icon"></i>
                </div>

                <select
                  className="form-control w-md"
                  data-choices
                  data-choices-search-false
                >
                  <option value="All">전체</option>
                  <option value="Last 7 Days">지난 7일</option>
                  <option value="Last 30 Days">지난 30일</option>
                  <option value="Last Year">작년</option>
                  <option value="This Month">이번 달</option>
                  <option value="Today">오늘</option>
                  <option value="Yesterday" defaultValue>
                    어제
                  </option>
                </select>
              </div>
            </div>
          </Row>
          <div className="card-body pt-0">
            <Card>
              <CardBody>
                {qsheetLogList && qsheetLogList.length > 0 ? (
                  <TableContainer
                    columns={columns}
                    data={qsheetLogList || []}
                    // isGlobalFilter={true}
                    isAddUserList={false}
                    customPageSize={10}
                    className="custom-header-css"
                    divClass="table-responsive mb-1 table-card"
                    tableClass="mb-0 align-middle table-nowrap"
                    theadClass="table-light text-muted"
                    getTrProps={(state, rowInfo, column) => {
                      return {
                        onClick: (e) => {
                          console.log(rowInfo.original);
                          // history.push("/qsheet-create");
                        },
                      };
                    }}
                    // isProductsFilter={true}
                    // SearchPlaceholder="Search Products..."
                  />
                ) : (
                  <div className="py-4 text-center">
                    <div>
                      <lord-icon
                        src="https://cdn.lordicon.com/msoeawqm.json"
                        trigger="loop"
                        colors="primary:#405189,secondary:#0ab39c"
                        style={{ width: "72px", height: "72px" }}
                      ></lord-icon>
                    </div>

                    <div className="mt-4">
                      <h5>Sorry! No Result Found</h5>
                    </div>
                  </div>
                )}
              </CardBody>
            </Card>
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default CuesheetLog;
