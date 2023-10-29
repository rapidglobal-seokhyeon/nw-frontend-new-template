/* eslint-disable react/jsx-key */
import React, { useEffect, useMemo, useRef, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  HiOutlinePencil,
  HiOutlineTrash,
  HiExternalLink,
  HiOutlineUpload,
} from "react-icons/hi";
import useThemeClass from "@components/Hooks/useThemeClass";
import { useNavigate, useLocation, useParams } from "react-router-dom";

import toast from "@/Components/ui/toast";
import Tooltip from "@/Components/ui/Tooltip";
import Input from "@/Components/ui/Input";
import { useReactToPrint } from "react-to-print";
import { PERSIST_STORE_NAME } from "@/constants/app.constant";
import deepParseJson from "@/utils/deepParseJson";
import axios from "axios";
import {
  getQSheetCardDetails,
  updateQsheetList,
} from "@helpers/Cuesheet/cuesheet_helper";
import Notification from "@/Components/ui/Notification";
import Button from "@/Components/ui/Button";
import { getFilesByGroupId } from "@/helpers/File/file_helper";
import TableContainer from "@/Components/Common/TableContainer";
import { Container } from "reactstrap";
import BreadCrumb from "@/Components/Common/BreadCrumb";
import { ToastContainer } from "react-toastify";

const inputStyle = {
  // border: '1px solid #ccc'
  borderRadius: "4px",
  padding: "5px",
  margin: "5px",
  outline: "none",
  width: "90%",
};

const readOnlyStyle = {
  borderRadius: "4px",
  padding: "5px",
  margin: "5px",
  width: "95%",
  border: "1px solid rgb(209 213 219)",
  backgroundColor: "white",
};

const actorInputStyle = {
  borderRadius: "4px",
  padding: "5px",
  margin: "5px",
  outline: "none",
  width: "95%",
  border: "1px solid rgb(209 213 219)",
  backgroundColor: "white",
};

const CuesheetUserDetail = () => {
  const [applyCustomStyle, setApplyCustomStyle] = useState(false);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const qsheetSeq = params?.qsheetSeq;

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    console.info("qsheetSeq", qsheetSeq);

    if (qsheetSeq) {
      setLoading(true);
      const data = await getQSheetCardDetails(qsheetSeq);
      console.info("response", data);
      if (data) {
        const res = data;
        const responseData = data?.data;
        setLoading(false);
        setDataList(res);
        setDataContent(responseData);
        setDataContent(
          responseData.map((data) => {
            return { ...data, readOnly: true };
          })
        );
      }
    }
  };

  const [dataList, setDataList] = useState();
  const orgSeq = dataList?.orgSe?.orgSeq;
  const secretMemo = dataList?.memo;

  const initialDataContent = [
    {
      actor: "",
      content: "",
      filePath: "",
      note: "",
      orderIndex: 1,
      process: "",
      readOnly: false, // 처음에는 수정 가능하게 시작
      memo: "", // memo: 추가
    },
  ];
  const [dataContent, setDataContent] = useState(initialDataContent);

  const rawPersistData = localStorage.getItem(PERSIST_STORE_NAME);
  const persistData = deepParseJson(rawPersistData);

  // const orgSeq = dataList

  const navigate = useNavigate();

  const onUpdate = async () => {
    // 빈 행인지 확인하는 로직
    const hasEmptyRow = dataContent.some(
      (item) =>
        item.process.trim() === "" &&
        item.actor.trim() === "" &&
        item.content.trim() === "" &&
        item.note.trim() === "" &&
        !fileInputs[item.orderIndex - 1] // 해당 행의 파일이 없는 경우
    );

    if (hasEmptyRow) {
      toast.push(
        <Notification title={"실패"} type="warning">
          입력되지 않은 행이 있습니다.
        </Notification>
      );
      return; // 빈 행이 있을 경우 함수 종료
    }

    // 빈 행이 없을 경우 아래의 업데이트 로직을 실행
    // ... (기존의 onUpdate 내용)

    const qsheetData = {
      orgSeq: orgSeq,
      data: [],
      memo: secretMemo,
    };
    const addData = [];
    const formData = new FormData();

    for (let i = 0; i < dataContent.length; i++) {
      const item = dataContent[i];
      const updatedFilePath = fileInputs[i]
        ? `${item.process}_${fileInputs[i].name}`
        : item.filePath;

      const requestData = dataContent.map((item) => ({
        orderIndex: item.orderIndex,
        process: item.process,
        content: item.content,
        actor: item.actor,
        note: item.note,
        filePath: updatedFilePath,
        memo: item.memo,
      }));
      qsheetData.data = qsheetData.data.concat(requestData[i]);
      console.log(qsheetData.data);
      console.log(qsheetData);
    }

    console.log(JSON.stringify(qsheetData));

    formData.append(
      "qsheetUpdateDto",
      new Blob([JSON.stringify(qsheetData)], {
        type: "application/json",
      })
    );
    // console.log([JSON.stringify(qsheetData)])

    fileInputs.forEach((file, index) => {
      if (file) {
        formData.append(`files`, file);
      }
    });

    try {
      // Axios나 fetch 등을 사용하여 API로 FormData를 POST 요청으로 보냅니다.
      const response = await updateQsheetList(qsheetSeq, formData);

      if (response.status === 200) {
        toast.push(
          <Notification title={"큐시트가 수정되었습니다."} type="success">
            큐시트가 수정되었습니다.
          </Notification>
        );
        navigate("/cuesheet");
      }
    } catch (error) {
      // 에러를 처리합니다.
      console.error(error);
    }
  };

  const handleInputChange = (field, value, index) => {
    const updatedDataList = [...dataContent];

    let className = "";
    if (field === "actor") {
      className = fontColor(value);
    } else {
      className = "text-purple-600"; // 다른 필드에 대한 클래스 설정
    }
    console.info("updatedDataList", updatedDataList);
    console.info("index", index);
    updatedDataList[index][field] = value;
    setDataContent(updatedDataList);
  };

  const fileInputRef = useRef(null); // useRef를 사용하여 파일 입력 요소를 참조

  const [fileInputs, setFileInputs] = useState([]);

  const handleFileChange = (e, index) => {
    const updatedDataList = [...dataContent];

    const files = e.target.files;
    console.info("dasdasdsa");
    const updatedFileInputs = [...files].filter((file) => file.size > 0);

    setFileInputs(updatedFileInputs);
    if (files.length > 0) {
      updatedDataList[index] = {
        ...updatedDataList[index],
        filePath: files[0].name,
      };
      setDataContent(updatedDataList);
    }

    console.log(updatedDataList);
  };

  const onDragEnd = (result) => {
    // 드래그가 취소된 경우
    if (!result.destination) return;

    // 리액트 불변성을 지켜주기 위해 새로운 todoData 생성
    const newItems = [...dataContent];

    // 1. 변경시키는 아이템을 배열에서 지워줍니다.
    // 2. return 값으로 지워진 아이템을 잡아줍니다.
    const [reorderedItem] = newItems.splice(result.source.index, 1);

    // 원하는 자리에 reorderedItem을 insert 해줍니다.
    newItems.splice(result.destination.index, 0, reorderedItem);

    setDataContent(newItems);
  };

  const fontColor = (e) => {
    if (e === "신랑") {
      return "m-2 bg-blue-200 border-blue-500 w-10 rounded-lg border-2 text-blue-500 text-center";
    } else if (e === "신부") {
      return "m-2 bg-red-200 border-red-500 w-10 rounded-lg border-2 text-red-500 text-center";
    } else if (e === "신부 어머니") {
      return "m-2 bg-amber-100 border-amber-500 w-20 rounded-lg border-2 text-amber-500 text-center";
    } else if (e === "신랑 어머니") {
      return "m-2 bg-indigo-200 border-indigo-500 w-20 rounded-lg border-2 text-indigo-500 text-center";
    } else if (e === "신부 아버지") {
      return;
    } else if (e === "신랑 아버지") {
      return;
      // eslint-disable-next-line no-constant-condition
    } else if (e === "사회자" || "축가자" || "주례자") {
      return "m-2 bg-violet-200 border-violet-500 w-12 rounded-lg border-2 text-violet-500 text-center";
    } else {
      return "text-purple-600";
    }
  };

  // 행추가
  const onAdd = () => {
    console.log("add");
    const orderIndex = dataContent.length + 1; // 다음 행의 orderIndex를 설정
    const newDataItem = {
      actor: "",
      content: "",
      filePath: "",
      note: "",
      orderIndex,
      process: "",
      readOnly: false,
    };
    // dataContent 배열에 새 데이터 아이템을 추가합니다.
    setDataContent([...dataContent, newDataItem]);
  };

  const ActionColumn = ({ row, dataContent, setDataContent }) => {
    const { textTheme } = useThemeClass();

    const onEdit = () => {
      setDataContent(
        dataContent.map((item) =>
          item.orderIndex === row.orderIndex
            ? { ...item, readOnly: !item.readOnly }
            : item
        )
      );
    };
    // 행 삭제
    const onDelete = () => {
      const rowData = dataContent.find(
        (item) => item.orderIndex == row.orderIndex
      );

      console.log(rowData);
      // 데이터를 삭제하고 업데이트된 배열을 생성합니다.
      const updatedData = dataContent.filter(
        (item) => item.orderIndex !== rowData.orderIndex
      );

      // 업데이트된 배열을 qSheetExampleData로 설정하여 데이터를 삭제합니다.
      setDataContent(updatedData);

      toast.push(
        <Notification title={"삭제되었습니다."} type="success">
          삭제되었습니다.
        </Notification>
      );
    };

    return (
      <div>
        <span className="flex items-center justify-center">
          <Tooltip title="수정">
            <span
              className={`cursor-pointer p-2 hover:${textTheme}`}
              onClick={() => onEdit()}
            >
              <HiOutlinePencil />
            </span>
          </Tooltip>
        </span>

        <span className="flex items-center justify-center">
          <Tooltip title="삭제">
            <span
              className="cursor-pointer p-2 hover:text-red-500"
              onClick={() => onDelete()}
            >
              <HiOutlineTrash />
            </span>
          </Tooltip>
        </span>
      </div>
    );
  };

  const componentRef = useRef(null);

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

  const downloadAllFile = async () => {
    const fileNames = dataContent.filter((item) => item.filePath);
    if (fileNames.length === 0) {
      alert("다운로드받을 파일이 없습니다.");
      return;
    }

    getFilesByGroupId(qsheetSeq).then((response) => {
      console.info("response", response);
      // create file link in browser's memory
      const href = URL.createObjectURL(response);

      // create "a" HTML element with href to file & click
      const link = document.createElement("a");
      link.href = href;
      link.setAttribute("download", "file.zip"); //or any other extension
      document.body.appendChild(link);
      link.click();

      // clean up "a" element & remove ObjectURL
      document.body.removeChild(link);
      URL.revokeObjectURL(href);
    });

    const fileUrls = fileNames.forEach((fileName) => {
      /*   window.open(
        `http://localhost:8080/api/v1/cuesheet/download/${fileName}`,
        "_blank"
      );*/
    });
  };
  console.info("dataContent", dataContent);
  const [isFinalConfirmed, setIsFinalConfirmed] = useState(false);
  const finalButton = () => {
    setIsFinalConfirmed(true);

    toast.push(
      <Notification title={"success"} type="success">
        이제 큐시트를 변경할 수 없습니다.
      </Notification>
    );
  };

  const columns = useMemo(
    () => [
      {
        Header: "절차",
        accessor: "process",
        Cell: (cell) => (
          <input
            className="focus:border border-gray-300"
            type="text"
            style={cell.row.original.readOnly ? inputStyle : readOnlyStyle}
            readOnly={isFinalConfirmed || cell.row.original.readOnly}
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
            style={
              applyCustomStyle
                ? {
                    ...inputStyle,
                    ...actorInputStyle,
                  }
                : inputStyle
            }
            readOnly={isFinalConfirmed || cell.row.original.readOnly}
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
            style={
              cell.row.original.readOnly
                ? inputStyle //contentInputStyle
                : readOnlyStyle
            }
            readOnly={isFinalConfirmed || cell.row.original.readOnly}
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
              disabled={isFinalConfirmed}
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
            style={
              cell.row.original.readOnly
                ? inputStyle //contentInputStyle
                : readOnlyStyle
            }
            readOnly={isFinalConfirmed || cell.row.original.readOnly}
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
        <BreadCrumb title="큐시트 내용" pageTitle="큐시트 내용" />
        <ToastContainer closeButton={false} />
        <div className="lg:flex items-center justify-between mb-4">
          <div className="flex flex-col md:flex-row md:items-center gap-1">
            <span>
              <Button block size="sm" icon={<HiExternalLink />}>
                공유
              </Button>
            </span>
            <span>
              <Button size="sm" onClick={onAdd}>
                추가
              </Button>
            </span>
            <span>
              <Button
                block
                size="sm"
                disabled={isFinalConfirmed}
                onClick={onUpdate}
              >
                저장
              </Button>
            </span>

            <span>
              <Button
                block
                size="sm"
                variant="twoTone"
                disabled={isFinalConfirmed} // 버튼을 비활성화
                onClick={finalButton}
              >
                최종확인
              </Button>
            </span>
            <span>
              <Button size="sm" onClick={clickPrint}>
                인쇄
              </Button>
            </span>
            <span>
              <Button size="sm" onClick={downloadAllFile}>
                파일 일괄 다운로드
              </Button>
            </span>
          </div>
        </div>
        <div>
          <div ref={componentRef} className="CueSheet Content">
            <TableContainer
              columns={columns}
              data={dataContent}
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
          <div className="mb-10">
            <div className="mb-4 w-full">
              <Input
                textArea
                className="w-full focus:border border-gray-300 mt-3"
                // style={inputStyle}
                value={dataList?.memo}
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CuesheetUserDetail;
