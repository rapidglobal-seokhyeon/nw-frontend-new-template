import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  Col,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  Row,
  UncontrolledDropdown,
} from "reactstrap";
import DeleteModal from "../../../../Components/Common/DeleteModal";
import { ToastContainer } from "react-toastify";

//redux
import { useSelector, useDispatch } from "react-redux";

//Import Icons
import FeatherIcon from "feather-icons-react";

//import action
import {
  getQsheetList as onGetQsheetList,
  deleteQsheetList as onDeleteQsheetList,
} from "../../../../slices/thunks";
import { createSelector } from "reselect";
import BreadCrumb from "../../../../Components/Common/BreadCrumb";

const CuesheetUser = () => {
  const dispatch = useDispatch();

  const selectQsheetData = createSelector(
    (state) => state.Qsheet.qsheetList,
    (qsheetList) => qsheetList
  );
  // Inside your component
  const qsheetLists = useSelector(selectQsheetData);

  const [qsheet, setQsheet] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);

  useEffect(() => {
    dispatch(onGetQsheetList());
  }, [dispatch]);

  useEffect(() => {
    setQsheet(qsheetLists);
  }, [qsheetLists]);

  // delete
  const onClickData = (qsheet) => {
    setQsheet(qsheet);
    setDeleteModal(true);
  };

  const handleDeleteQsheetList = () => {
    if (qsheet) {
      dispatch(onDeleteQsheet(qsheet));
      setDeleteModal(false);
    }
  };

  const activebtn = (ele) => {
    if (ele.closest("button").classList.contains("active")) {
      ele.closest("button").classList.remove("active");
    } else {
      ele.closest("button").classList.add("active");
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="큐시트 목록" pageTitle="큐시트 관리" />
          <ToastContainer closeButton={false} />
          <DeleteModal
            show={deleteModal}
            onDeleteClick={() => handleDeleteQsheetList()}
            onCloseClick={() => setDeleteModal(false)}
          />

          <Row className="g-4 mb-3">
            <div className="col-sm-auto">
              <div>
                <Link to="/uqsheet/create" className="btn btn-success">
                  <i className="ri-add-line align-bottom me-1"></i> 새로 만들기
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
          <div className="row">
            {/* {(qsheetLists || []).map((item, index) => ( */}
            {qsheetLists.map((item, index) => (
              <React.Fragment key={index}>
                {item.name ? (
                  <Col xxl={3} sm={6} className="project-card">
                    <Card className="card-height-100">
                      <CardBody>
                        <div className="d-flex flex-column h-100">
                          <div className="d-flex">
                            <div className="flex-grow-1">
                              <p className="text-muted mb-4">
                                {item.created_at}
                              </p>
                            </div>
                            <div className="flex-shrink-0">
                              <div className="d-flex gap-1 align-items-center">
                                <button
                                  type="button"
                                  className={`btn avatar-xs mt-n1 p-0 favourite-btn ${item.ratingClass}`}
                                  onClick={(e) => activebtn(e.target)}
                                >
                                  <span className="avatar-title bg-transparent fs-15">
                                    <i className="ri-star-fill"></i>
                                  </span>
                                </button>
                                <UncontrolledDropdown direction="start">
                                  <DropdownToggle
                                    tag="button"
                                    className="btn btn-link text-muted p-1 mt-n2 py-0 text-decoration-none fs-15"
                                  >
                                    <FeatherIcon
                                      icon="more-horizontal"
                                      className="icon-sm"
                                    />
                                  </DropdownToggle>

                                  <DropdownMenu className="dropdown-menu-end">
                                    <DropdownItem href="apps-projects-overview">
                                      <i className="ri-eye-fill align-bottom me-2 text-muted"></i>{" "}
                                      보기
                                    </DropdownItem>
                                    <DropdownItem href="apps-projects-create">
                                      <i className="ri-pencil-fill align-bottom me-2 text-muted"></i>{" "}
                                      수정
                                    </DropdownItem>
                                    <div className="dropdown-divider"></div>
                                    <DropdownItem
                                      href="#"
                                      onClick={() => onClickData(item)}
                                      data-bs-toggle="modal"
                                      data-bs-target="#removeProjectModal"
                                    >
                                      <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i>{" "}
                                      삭제
                                    </DropdownItem>
                                  </DropdownMenu>
                                </UncontrolledDropdown>
                              </div>
                            </div>
                          </div>
                          <div className="d-flex mb-2">
                            <div className="flex-grow-1">
                              <h5 className="mb-1 fs-15">
                                <Link
                                  to={`/uqsheet/detail/${item.qsheetSeq}`}
                                  className="text-body"
                                >
                                  {item.name}
                                </Link>
                              </h5>
                              <div>
                                <p className="text-muted mb-1">최종승인 여부</p>
                                <div className="fs-12 badge bg-waring-subtle">
                                  {item.org_confirm}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardBody>
                      <div className="card-footer bg-transparent border-top-dashed py-2">
                        <div className="d-flex align-items-center">
                          <div className="flex-shrink-0">
                            <div className="text-muted">
                              <i className="ri-calendar-event-fill me-1 align-bottom"></i>{" "}
                              {item.created_at}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Col>
                ) : item.isDesign2 ? (
                  <Col xxl={3} sm={6} className="project-card"></Col>
                ) : null}
              </React.Fragment>
            ))}
          </div>
          <Row className="g-0 text-center text-sm-start align-items-center mb-4">
            <Col sm={6}>
              <div>
                <p className="mb-sm-0 text-muted">
                  Showing <span className="fw-semibold">1</span> to{" "}
                  <span className="fw-semibold">10</span> of
                  <span className="fw-semibold">&nbsp;12</span> entries
                </p>
              </div>
            </Col>

            <Col sm={6}>
              <ul className="pagination pagination-separated justify-content-center justify-content-sm-end mb-sm-0">
                <li className="page-item disabled">
                  <Link to="#" className="page-link">
                    Previous
                  </Link>
                </li>
                <li className="page-item active">
                  <Link to="#" className="page-link">
                    1
                  </Link>
                </li>
                <li className="page-item ">
                  <Link to="#" className="page-link">
                    2
                  </Link>
                </li>
                <li className="page-item">
                  <Link to="#" className="page-link">
                    3
                  </Link>
                </li>
                <li className="page-item">
                  <Link to="#" className="page-link">
                    4
                  </Link>
                </li>
                <li className="page-item">
                  <Link to="#" className="page-link">
                    5
                  </Link>
                </li>
                <li className="page-item">
                  <Link to="#" className="page-link">
                    Next
                  </Link>
                </li>
              </ul>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default CuesheetUser;
