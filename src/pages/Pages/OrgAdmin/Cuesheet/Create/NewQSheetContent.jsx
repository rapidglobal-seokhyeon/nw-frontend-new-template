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
import { addQsheetList } from "@/helpers/Cuesheet/cuesheet_helper";
import TableContainer from "@/Components/Common/TableContainer";
import { useMemo } from "react";
import { Container } from "reactstrap";
import BreadCrumb from "@/Components/Common/BreadCrumb";

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

const NewQSheetContent = () => {
  const rawPersistData = localStorage.getItem(PERSIST_STORE_NAME);
  const persistData = deepParseJson(rawPersistData);
  console.info("persistData", persistData);
  const userSeq = persistData.auth.user.userSeq;

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
      name: name,
      userSeq: userSeq,
      data: [],
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

    console.log(alert(JSON.stringify(qsheetData)));

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

    navigate("/cuesheet");
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

  const [dataList, setDataList] = useState([initialData]);
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
    console.info("index", index);
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
      const rowData = dataList.find((item) => item.orderIndex === row.index);
      console.log(rowData);

      // 데이터를 삭제하고 업데이트된 배열을 생성합니다.
      const updatedData = dataList.filter(
        (item) => item.orderIndex !== row.index
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
    setDataList([
      {
        process: "",
        actor: "",
        content: "",
        filePath: "",
        note: "",
        orderIndex: 1,
        memo: "",
      },
    ]);
  };

  const columns = useMemo(
    () => [
      {
        Header: "식순명",
        accessor: "process",
        Cell: (cell) => (
          <input
            className="focus:border border-gray-300"
            type="text"
            style={inputStyle}
            value={cell.row.original.process}
            onChange={(e) =>
              handleInputChange("process", e.target.value, cell.row.index)
            }
          />
        ),
      },
      {
        Header: "행위자",
        accessor: "actor",
        Cell: (cell) => (
          <input
            className="focus:border border-gray-300"
            type="text"
            style={inputStyle}
            value={cell.row.original.actor}
            onChange={(e) =>
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
          <input
            className="focus:border border-gray-300"
            type="text"
            style={inputStyle}
            value={cell.row.original.content}
            onChange={(e) =>
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
            >
              &nbsp; &nbsp;
              <HiOutlineUpload className="text-2xl mr-1 " />
              <span
                id="fileNameDisplay"
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: "200px", // 파일명을 표시할 최대 너비 설정
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
          <input
            className="focus:border border-gray-300"
            type="text"
            style={inputStyle}
            value={cell.row.original.note}
            onChange={(e) =>
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
    []
  );

  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb title="큐시트 생성" pageTitle="큐시트 생성" />
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
          </div>
        </div>

        <div>
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

export default NewQSheetContent;
