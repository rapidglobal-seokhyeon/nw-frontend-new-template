/* eslint-disable react/jsx-key */
import React, { useEffect, useRef, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import '@/assets/styles/components/_tables.css'
import { HiOutlineTrash, HiOutlineUpload } from "react-icons/hi";

import { PERSIST_STORE_NAME } from "@/constants/app.constant";
import deepParseJson from "@/utils/deepParseJson";
import toast from "@/Components/ui/toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Tooltip from "@/Components/ui/Tooltip";
import Button from "@/Components/ui/Button";
import useThemeClass from "@/Components/Hooks/useThemeClass";
import Notification from "@/Components/ui/Notification";
import {
  addQsheetList,
  getQSheetCardDetails,
} from "@/helpers/Cuesheet/cuesheet_helper";
import TableContainer from "@/Components/Common/TableContainer";
import { useMemo } from "react";
import {
  Container,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
} from "reactstrap";
import BreadCrumb from "@/Components/Common/BreadCrumb";
import { ToastContainer } from "react-toastify";
import LoadCueSheetModal from "@/Components/Common/LoadCueSheetModal";
import { apiGetOrgList } from "@/helpers/Org/org_helper";

const inputStyle = {
  // border: '1px solid #ccc'
  borderRadius: "4px",
  padding: "5px",
  margin: "5px",
  outline: "none",
  width: "95%",
};

const contentInputStyle = {
  // border: '1px solid #ccc'
  borderRadius: "4px",
  padding: "5px",
  margin: "5px",
  outline: "none",
  width: "95%",
  overFlow: "hidden",
};

const initialData = {
  process: "",
  actor: "",
  content: "",
  filePath: "",
  note: "",
  orderIndex: 1,
  memo: "",
};

const CreateCuesheetUser = () => {
  const rawPersistData = localStorage.getItem(PERSIST_STORE_NAME);
  const persistData = deepParseJson(rawPersistData);
  console.info("persistData", persistData);
  const userSeq = persistData.auth.user.userSeq;
  const [qsheetName, setQsheetName] = useState("");
  const [isOpenLoadModal, setIsOpenLoadModal] = useState(false);

  const onConfirm = () => {
    let allRowsEmpty = false; // 모든 행이 빈 칸인지 여부를 추적

    for (const e of dataList) {
      console.log(e);
      if (
        e.actor === "" &&
        e.content === "" &&
        e.filePath === "" &&
        e.note === "" &&
        e.process === ""
      ) {
        allRowsEmpty = true; // 한 행이라도 내용이 입력되었음
        break;
      }
    }

    if (allRowsEmpty) {
      toast.push(
        <Notification title={"실패"} type="warning">
          입력되지 않은 행이 있습니다.
        </Notification>
      );
    } else {
      onCreate();
    }
  };

  const navigate = useNavigate();
  const onCreate = async () => {
    const date = new Date();
    const name = "큐시트_" + date.toLocaleDateString("ko-kr");

    const qsheetData = {
      name: qsheetName,
      userSeq: userSeq,
      orgSeq: currentOrg.orgSeq,
      data: [],
      memo: secretMemo,
    };

    const addData = [];
    const formData = new FormData();

    for (let i = 0; i < dataList.length; i++) {
      const item = dataList[i];
      const filePath = item.filePath ? item.filePath : "";

      const requestData = dataList.map((item) => ({
        orderIndex: item.orderIndex,
        process: item.process,
        content: item.content,
        actor: item.actor,
        note: item.note,
        filePath: filePath,
      }));

      qsheetData.data = qsheetData.data.concat(requestData[i]);
    }

    formData.append(
      "qsheetCreateDto",
      new Blob([JSON.stringify(qsheetData)], {
        type: "application/json",
      })
    );

    fileInputs.forEach((file, index) => {
      if (file) {
        formData.append(`files`, file);
      }
    });

    try {
      // Axios나 fetch 등을 사용하여 API로 FormData를 POST 요청으로 보냅니다.

      const response = await addQsheetList(formData);

      // API 응답을 필요에 따라 처리합니다.
      console.log(response.data);
    } catch (error) {
      // 에러를 처리합니다.
      console.error(error);
    }

    toast.push(
      <Notification title={"큐시트가 생성되었습니다."} type="success">
        큐시트가 생성되었습니다.
      </Notification>
    );

    setDataList([]);

    //  getList();

    navigate("/uqsheet");
  };

  useEffect(() => {
    // getList();
    const initialDataLists = [
      {
        process: "",
        actor: "",
        content: "",
        filePath: "",
        note: "",
        orderIndex: 1,
        memo: "",
      },
    ];
    setDataList(initialDataLists);
  }, []);
  const [isOrgVisible, setIsOrgVisible] = useState(false);
  const [orgList, setOrgList] = useState([]);
  const [currentOrg, setOrg] = useState();
  const [dataList, setDataList] = useState([{ ...initialData }]);
  const [newData, setNewData] = useState({
    ...initialData,
    orderIndex: 2,
  });

  // const handleAddData = () => {
  //     setNewData({
  //         ...newData,
  //         orderIndex: newData.orderIndex + 1,
  //     })
  //     setDataList([...dataList, newData])
  // }

  const handleInputChange = (field, value, index) => {
    console.log(dataList);
    const updatedDataList = [...dataList];
    updatedDataList[index][field] = value;
    setDataList(updatedDataList);
  };

  const fileInputRef = useRef(null); // useRef를 사용하여 파일 입력 요소를 참조

  const [fileInputs, setFileInputs] = useState([]);

  const handleFileChange = (e, index) => {
    console.log(e);
    console.log(index);

    const updatedDataList = [...dataList];
    console.log("updatedDataList", updatedDataList);
    // const file = e.target.files[0]
    const files = e.target.files;
    console.log(files);

    const updatedFileInputs = [...files].filter((file) => file.size > 0);

    setFileInputs(updatedFileInputs);
    if (files.length > 0) {
      updatedDataList[index] = {
        ...updatedDataList[index],
        filePath: files[0].name,
      };
      setDataList(updatedDataList);
    }
    console.log(updatedDataList);
  };

  const onDragEnd = (result) => {
    console.log(result);
    // 드래그가 취소된 경우
    if (!result.destination) return;

    // 리액트 불변성을 지켜주기 위해 새로운 todoData 생성
    const newItems = [...dataList];

    // 1. 변경시키는 아이템을 배열에서 지워줍니다.
    // 2. return 값으로 지워진 아이템을 잡아줍니다.
    const [reorderedItem] = newItems.splice(result.source.index, 1);

    // 원하는 자리에 reorderedItem을 insert 해줍니다.
    newItems.splice(result.destination.index, 0, reorderedItem);

    setDataList(newItems);
  };

  const onAdd = () => {
    console.log("add");
    setNewData({
      ...newData,
      orderIndex: newData.orderIndex + 1,
    });
    setDataList([...dataList, newData]);
  };

  const ActionColumn = ({ row }) => {
    const { textTheme } = useThemeClass();

    const onDelete = (orderIndex) => {
      //삭제할 데이터 찾기
      const rowData = dataList.find(
        (item) => item.orderIndex === row.original.orderIndex
      );

      // 데이터를 삭제하고 업데이트된 배열을 생성합니다.
      const updatedData = dataList.filter(
        (item) => item.orderIndex !== rowData.orderIndex
      );
      console.log(updatedData);

      setDataList(updatedData);
    };
    return (
      <div className="inset-0 flex items-center justify-center text-lg">
        <Tooltip title="삭제">
          <span
            className="cursor-pointer p-2 hover:text-red-500"
            onClick={() => onDelete(row.index)}
          >
            <HiOutlineTrash />
          </span>
        </Tooltip>
      </div>
    );
  };

  const reset = () => {
    console.info("initialData", initialData);
    setDataList([{ ...initialData }]);
  };

  const loadCueSheet = async (id) => {
    const result = await getQSheetCardDetails(id);
    setDataList([...result.data]);
    setIsOpenLoadModal(false);
  };

  useEffect(() => {
    async function load() {
      const response = await apiGetOrgList();
      if (response.content) {
        const optionList = [];
        for (const res of response.content) {
          optionList.push({ ...res });
        }
        setOrgList(optionList);
      }
    }
    load();
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: "식순명",
        accessor: "process",
        Cell: (cell) => (
          <Input
            type="text"
            id="userName"
            defaultValue={cell.row.original.process}
            style={inputStyle}
            onBlur={(e) =>
              handleInputChange("process", e.target.value, cell.row.index)
            }
          />
        ),
      },
      {
        Header: "행위자",
        accessor: "actor",
        Cell: (cell) => (
          <Input
            type="text"
            id="userName"
            style={inputStyle}
            defaultValue={cell.row.original.actor}
            onBlur={(e) =>
              handleInputChange("actor", e.target.value, cell.row.index)
            }
          />
        ),
      },
      {
        Header: "내용",
        accessor: "content",
        filterable: false,
        Cell: (cell) => (
          <Input
            type="text"
            id="userName"
            style={inputStyle}
            defaultValue={cell.row.original.content}
            onBlur={(e) =>
              handleInputChange("content", e.target.value, cell.row.index)
            }
          />
        ),
      },
      {
        Header: "파일",
        accessor: "updated_at",
        Cell: (cell) => (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <input
              multiple
              className="focus:border border-gray-300"
              type="file"
              ref={fileInputRef} // useRef로 파일 입력 요소를 참조
              style={{
                display: "none",
              }}
              id={`fileInput-${cell.row.index}`}
              accept="*/*"
              onChange={(e) => handleFileChange(e, cell.row.index)}
            />
            <label
              htmlFor={`fileInput-${cell.row.index}`}
              className="cursor-pointer flex items-center "
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <HiOutlineUpload className="text-2xl mr-1 " />
              <span
                id="fileNameDisplay"
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: "100px", // 파일명을 표시할 최대 너비 설정
                  display: "inline-block",
                }}
              >
                {cell.row.original.filePath
                  ? cell.row.original.filePath.split("/")[
                      cell.row.original.filePath.split("/").length - 1
                    ]
                  : "파일"}
              </span>
            </label>
          </div>
        ),
      },
      {
        Header: "비고",
        accessor: "note",
        Cell: (cell) => (
          <Input
            type="text"
            id="userName"
            style={inputStyle}
            defaultValue={cell.row.original.note}
            onBlur={(e) =>
              handleInputChange("note", e.target.value, cell.row.index)
            }
          />
        ),
      },
      {
        Header: "액션",
        accessor: "action",
        Cell: (cell) => <ActionColumn row={cell.row} />,
      },
    ],
    [dataList]
  );

  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb title="큐시트 생성" pageTitle="큐시트 생성" />
        <ToastContainer closeButton={false} />
        <div className="lg:flex items-center justify-between mb-4">
          <div className="flex flex-col md:flex-row md:items-center gap-1">
            <Button block size="sm" variant="twoTone" onClick={reset}>
              초기화
            </Button>
            <Button size="sm" onClick={onAdd}>
              추가
            </Button>
            <Button block size="sm" variant="twoTone" onClick={onConfirm}>
              저장
            </Button>
            <Button block size="sm" onClick={() => setIsOpenLoadModal(true)}>
              불러오기
            </Button>
          </div>
        </div>
        <LoadCueSheetModal
          show={isOpenLoadModal}
          onLoadClick={(address) => loadCueSheet(address)}
          onCloseClick={() => setIsOpenLoadModal(false)}
        />

        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: 200,
              gap: 10,
            }}
          >
            <Input
              placeholder="큐시트 이름"
              value={qsheetName}
              onChange={(e) => setQsheetName(e.target.value)}
            />
            <Dropdown
              isOpen={isOrgVisible}
              style={{
                width: "100%",
              }}
            >
              <DropdownToggle
                caret
                onClick={() => setIsOrgVisible(true)}
                style={{
                  width: "100%",
                }}
              >
                {currentOrg?.orgName ?? "업체 검색"}
              </DropdownToggle>
              <DropdownMenu>
                {orgList.map((item) => (
                  <DropdownItem
                    onClick={() => {
                      setOrg(item);
                      setIsOrgVisible(false);
                    }}
                  >
                    {item.orgName}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
          <TableContainer
            columns={columns}
            data={dataList}
            // isGlobalFilter={true}
            isAddUserList={false}
            customPageSize={10}
            className="custom-header-css"
            divClass="table-responsive mb-1 table-card"
            tableClass="mb-0 align-middle table-nowrap"
            theadClass="table-light text-muted"
            // isProductsFilter={true}
            // SearchPlaceholder="Search Products..."
          />
        </div>
      </Container>
    </div>
  );
};

export default CreateCuesheetUser;
