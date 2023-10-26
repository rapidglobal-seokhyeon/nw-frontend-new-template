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
} from "reactstrap";
import { getEmployee } from "../../../../slices/thunks";
import TableContainer from "../../../../Components/Common/TableContainer";

const Employee = () => {

  const dispatch = useDispatch()

  const employeeList = useSelector((state) => state.Employee.content)
  console.log(employeeList)

  useEffect(() => {
    dispatch(getEmployee())
  }, [dispatch])

  const [modal, setModal] = useState(false);

  const toggle = () => {
    console.log(modal)
  
    if (modal) {
      setModal(false);
    } else {
      setModal(true);
    }
  };

  const toggleEdit = (e) => {
    console.log(e)
  
    // if (modal) {
    //   setModal(false);
    // } else {
    //   setModal(true);
    // }
  };

  const columns = useMemo(() => [
    {
      Header: "#",
      Cell: (cell) => {
        return <input type="checkbox" className="productCheckBox form-check-input" value={cell.row.original.userSeq} 
        // onClick={() => displayDelete()} 
        />;
      },
    },
    {
      Header: "아이디",
      accessor: "userId",
      filterable: true,
    },
    {
      Header: "이름",
      accessor: "userName",
      filterable: true,
    },
    {
      Header: "이메일",
      accessor: "userEmail",
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
        console.log("userSeq : ", cellProps.row.original.userSeq)
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
              <DropdownItem href="apps-ecommerce-product-details">
                <i className="ri-eye-fill align-bottom me-2 text-muted"></i>{" "}
                View
              </DropdownItem>

              <DropdownItem onClick={toggleEdit} isOpen={modal}>
                <i className="ri-pencil-fill align-bottom me-2 text-muted"></i>{" "}
                Edit
              </DropdownItem>

              <DropdownItem divider />
              <DropdownItem
                href="#"
                onClick={() => {
                  const productData = cellProps.row.original;
                  onClickDelete(productData);
                }}
              >
                <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i>{" "}
                Delete
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
          <div>직원 관리</div>
          <div className="card-body pt-0">   
          <div className="d-flex justify-content-end align-items-right">
            <div className="m-3">
            <button type="button" onClick={toggle} class="btn btn-soft-danger waves-effect waves-ligh">
              직원 등록
            </button>
            </div>
            <Modal id="composemodal" className="modal-md" isOpen={modal} toggle={toggle} centered>
        <ModalHeader className="bg-light p-3" toggle={toggle}>
          직원 등록
        </ModalHeader>
        <ModalBody>
          <div>
            <div className="mb-3 d-flex align-items-center">
                <div className="m-3" style={{ width: "20%" }}>ID</div>
              <Input
                type="text"
                id="userId"
              />
            </div>
            <div className="mb-3 d-flex align-items-center">
                <div className="m-3" style={{ width: "20%" }}>이름</div>
              <Input
                type="text"
                id="userName"
              />
            </div>
            <div className="mb-3 d-flex align-items-center">
                <div className="m-3" style={{ width: "20%" }}>이메일</div>
              <Input
                type="text"
                id="userEmail"
              />
            </div>
          </div>
        </ModalBody>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-ghost-danger"
            // onClick={}
          >
            취소
          </button>
          <button type="button" class="btn btn-soft-danger waves-effect waves-light">저장</button>

          
        </div>
      </Modal>            
          </div>     
          <Card>
            <CardBody>         
                  {employeeList && employeeList.length > 0 ? (
                    <TableContainer
                      columns={columns}
                      data={(employeeList || [])}
                      isGlobalFilter={true}
                      isAddUserList={false}
                      customPageSize={10}
                      className="custom-header-css"
                      divClass="table-responsive mb-1 table-card"
                      tableClass="mb-0 align-middle table-nowrap"
                      theadClass="table-light text-muted"
                      // isProductsFilter={true}
                      SearchPlaceholder='Search Products...'
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

export default Employee;
