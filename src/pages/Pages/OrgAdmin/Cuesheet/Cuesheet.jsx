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
import TableContainer from "../../../../Components/Common/TableContainer";

//Import Icons
import FeatherIcon from "feather-icons-react";

//import action
import {
  getQsheetList as onGetQsheetList,
  deleteQsheetList as onDeleteQsheetList,
} from "../../../../slices/thunks";
import { createSelector } from "reselect";
import BreadCrumb from "../../../../Components/Common/BreadCrumb";
import { Link, useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import { deleteQsheetList } from "@/helpers/Cuesheet/cuesheet_helper";

const Cuesheet = () => {
  const dispatch = useDispatch();

  const selectQsheetData = createSelector(
    (state) => state.Qsheet.qsheetList,
    (qsheetList) => qsheetList
  );
  const componentRef = useRef(null);

  // Inside your component
  const qsheetLists = useSelector(selectQsheetData);
  console.log(qsheetLists);

  const orgSeqList = qsheetLists.map((data) => data?.orgSeq);
  console.log(orgSeqList);
  console.info("qsheetLists", qsheetLists);
  const [qsheet, setQsheet] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(onGetQsheetList());
  }, [dispatch]);

  useEffect(() => {
    setQsheet(qsheetLists);
  }, [qsheetLists]);

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

  const clickPrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "CueSheet Content",
    pageStyle: `
        @page {
          size: 30cm 40cm;
          margin: 1cm;
        }
      `,
  });

  const columns = useMemo(
    () => [
      {
        Header: "#",
        Cell: (cell) => {
          return (
            <input
              type="checkbox"
              className="productCheckBox form-check-input"
              value={cell.row.original.userSeq}
              // onClick={() => displayDelete()}
            />
          );
        },
      },
      {
        Header: "큐시트 이름",
        accessor: "name",
        filterable: true,
        Cell: (cell) => {
          console.info("cell", cell);
          return (
            <Link
              to={`/qsheet-detail/${cell.row.original.qsheetSeq}`}
              className="text-body fw-bold"
            >
              {cell.row.original.name}
            </Link>
          );
        },
      },
      {
        Header: "작성자 이름",
        accessor: "userName",
        filterable: true,
      },
      {
        Header: "관리자 이름",
        accessor: "orgName",
        filterable: true,
      },
      {
        Header: "생성일 ",
        accessor: "created_at",
        filterable: false,
      },

      {
        Header: "Action",
        Cell: (cellProps) => {
          console.log("userSeq : ", cellProps.row.original.userSeq);
          return (
            <UncontrolledDropdown>
              <DropdownToggle
                href="#"
                className="btn btn-soft-secondary btn-sm"
                tag="button"
              >
                <i className="ri-more-fill" />
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-end">
                <DropdownItem
                  onClick={async () => {
                    deleteQsheetList(cellProps.row.original.qsheetSeq)
                      .then((res) => {
                        alert("삭제되었습니다.");
                        dispatch(onGetQsheetList());
                      })
                      .catch((err) => alert("삭제에 실패하였습니다."));
                  }}
                >
                  <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i>{" "}
                  Delete
                </DropdownItem>
                <DropdownItem
                  onClick={() => {
                    navigate(
                      `/qsheet-history/${cellProps.row.original.qsheetSeq}`
                    );
                  }}
                >
                  <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i>
                  수정로그
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          );
        },
      },
    ],
    []
  );
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="큐시트 목록" pageTitle="큐시트 관리" />
          <Row className="g-4 mb-3">
            <div className="col-sm-auto">
              <div>
                <Link to="/qsheet-create" className="btn btn-success">
                  <i className="ri-add-line align-bottom me-1"></i>
                  새로 만들기
                </Link>
                <button className="btn btn-success" onClick={clickPrint}>
                  인쇄
                </button>
                <Link to="/qsheet-history/all" className="btn btn-success">
                  수정내역
                </Link>
              </div>
            </div>
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
                {qsheetLists && qsheetLists.length > 0 ? (
                  <TableContainer
                    columns={columns}
                    data={qsheetLists || []}
                    ref={componentRef}
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

export default Cuesheet;
