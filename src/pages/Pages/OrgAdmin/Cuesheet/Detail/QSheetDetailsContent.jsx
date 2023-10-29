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
import { getQSheetCardDetails } from "@helpers/Cuesheet/cuesheet_helper";
import Notification from "@/Components/ui/Notification";
import Button from "@/Components/ui/Button";

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

const QSheetDetailsContent = () => {
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

    // console.log(alert(JSON.stringify(qsheetData)))

    formData.append(
      "qsheetUpdateDto",
      new Blob([JSON.stringify(qsheetData)], {
        type: "application/json",
      })
    );
    // console.log([JSON.stringify(qsheetData)])

    fileInputs.forEach((file, index) => {
      if (file) {
        formData.append(`files`, "");
      }
    });

    const accessToken = persistData.auth.session.accessToken;
    try {
      // Axios나 fetch 등을 사용하여 API로 FormData를 POST 요청으로 보냅니다.
      const response = await axios.patch(
        `http://152.69.228.245:10001/api/v1/qsheet/${qsheetSeq}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

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
    updatedDataList[index][field] = value;
    setDataContent(updatedDataList);
  };

  const fileInputRef = useRef(null); // useRef를 사용하여 파일 입력 요소를 참조

  const [fileInputs, setFileInputs] = useState([]);

  const handleFileChange = (e, index) => {
    const updatedDataList = [...dataContent];

    const files = e.target.files;

    const updatedFileInputs = [...fileInputs];

    for (let i = 0; i < e.target.files.length; i++) {
      updatedFileInputs[index + i] = e.target.files[i];
    }

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

  const [isFinalConfirmed, setIsFinalConfirmed] = useState(false);
  const finalButton = () => {
    setIsFinalConfirmed(true);

    toast.push(
      <Notification title={"success"} type="success">
        이제 큐시트를 변경할 수 없습니다.
      </Notification>
    );
  };

  return (
    <>
      <div className="lg:flex items-center justify-between mb-4">
        <h3 className="mb-4 lg:mb-0">큐시트 내용 2 </h3>

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
        </div>
      </div>
      <div>
        <div ref={componentRef} className="CueSheet Content">
          <table className="min-w-full divide-x divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-2 w-1/12 py-3 text-center rtl:text-rightfont-semibold uppercase tracking-wider text-gray-500 dark:text-gray-100 border border-gray-300">
                  절차
                </th>
                <th className="px-2 w-1/12 py-3 text-center border border-gray-300">
                  행위자
                </th>
                <th className="px-2 w-5/12 py-3 text-center border border-gray-300">
                  내용
                </th>
                <th className="px-2 w-2/12 py-3 text-center border border-gray-300">
                  파일
                </th>
                <th className="px-2 w-2/12 py-3 text-center border border-gray-300">
                  비고
                </th>
                <th className="px-2 w-1/12 py-3 text-center border border-gray-300">
                  액션
                </th>
              </tr>
            </thead>
          </table>
          <div>
            <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
              <Droppable droppableId="DetailsDroppable">
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="DetailsDroppable"
                  >
                    {dataContent.map((data, index) => (
                      <Draggable
                        key={data.orderIndex}
                        draggableId={String(data.orderIndex)}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <>
                              <tr key={index}>
                                {/* 절차 */}
                                <td className="border border-gray-200 w-1/12 py-2">
                                  <input
                                    type="text"
                                    style={
                                      data.readOnly ? inputStyle : readOnlyStyle
                                    } // readOnly일 때 readOnlyStyle을 적용
                                    value={data.process}
                                    readOnly={data.readOnly}
                                    onChange={(e) =>
                                      handleInputChange(
                                        "process",
                                        e.target.value,
                                        index
                                      )
                                    }
                                  />
                                </td>
                                {/* 행위자 */}
                                <td className="border border-gray-200 w-1/12 py-2">
                                  <input
                                    className={`focus:border border-gray-300 ${fontColor(
                                      data.actor
                                    )}`}
                                    type="text"
                                    style={
                                      applyCustomStyle
                                        ? {
                                            ...inputStyle,
                                            ...actorInputStyle,
                                          }
                                        : inputStyle
                                    }
                                    value={data.actor}
                                    readOnly={data.readOnly}
                                    onChange={(e) =>
                                      handleInputChange(
                                        "actor",
                                        e.target.value,
                                        index
                                      )
                                    }
                                  />
                                </td>
                                {/* 내용 */}
                                <td className="border border-gray-200 w-5/12 py-2">
                                  <input
                                    type="text"
                                    style={
                                      data.readOnly
                                        ? inputStyle //contentInputStyle
                                        : readOnlyStyle
                                    }
                                    value={data.content}
                                    readOnly={data.readOnly}
                                    onChange={(e) =>
                                      handleInputChange(
                                        "content",
                                        e.target.value,
                                        index
                                      )
                                    }
                                  />
                                </td>

                                {/* 파일 */}
                                <td className="border border-gray-200 w-2/12 py-2">
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                    }}
                                  >
                                    <input
                                      multiple
                                      type="file"
                                      style={{
                                        display: "none",
                                      }}
                                      ref={fileInputRef} // useRef로 파일 입력 요소를 참조
                                      id={`fileInput-${index}`}
                                      accept="*/*"
                                      onChange={(e) =>
                                        handleFileChange(e, index)
                                      }
                                    />
                                    <label
                                      htmlFor={`fileInput-${index}`}
                                      className="cursor-pointer flex items-center "
                                    >
                                      &nbsp; &nbsp;
                                      <HiOutlineUpload className="text-2xl mr-1" />
                                      <span
                                        id="fileNameDisplay"
                                        style={{
                                          whiteSpace: "nowrap",
                                          overflow: "hidden",
                                          textOverflow: "ellipsis",
                                          maxWidth: "200px",
                                        }}
                                      >
                                        {data.filePath
                                          ? data.filePath.split("/")[
                                              data.filePath.split("/").length -
                                                1
                                            ]
                                          : "파일"}
                                      </span>
                                    </label>
                                  </div>
                                </td>
                                {/* 비고 */}
                                <td className="border border-gray-200 w-2/12 py-2">
                                  <input
                                    type="text"
                                    style={
                                      data.readOnly
                                        ? inputStyle //contentInputStyle
                                        : readOnlyStyle
                                    }
                                    value={data.note}
                                    readOnly={data.readOnly}
                                    onChange={(e) =>
                                      handleInputChange(
                                        "note",
                                        e.target.value,
                                        index
                                      )
                                    }
                                  />
                                </td>
                                <td
                                  className="border border-gray-200 w-1/12 py-2 text-center"
                                  style={{
                                    verticalAlign: "middle",
                                  }}
                                >
                                  <div>
                                    <ActionColumn
                                      row={data}
                                      dataContent={dataContent}
                                      setDataContent={setDataContent}
                                    />
                                  </div>
                                </td>
                              </tr>
                            </>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
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
    </>
  );
};

export default QSheetDetailsContent;
