import {
  getQSheetCardDetails,
  getQsheetList,
} from "@/helpers/Cuesheet/cuesheet_helper";
import PropTypes from "prop-types";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
  Modal,
  ModalBody,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import TableContainer from "./TableContainer";
import { useMemo } from "react";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";

const PrintCueSheetModal = ({ show, onLoadClick, onCloseClick, idList }) => {
  const [address, setAddress] = useState("");
  const componentRef = useRef();
  const [currentPage, setPage] = useState(0);
  const [dataContent, setDataContent] = useState([]);
  useEffect(() => {
    async function loadQsheetList() {
      for (const id of idList) {
        const result = await getQSheetCardDetails(id);
        if (result) {
          console.info("result", result);
          const responseData = result?.data;
          console.info("responseData", responseData);
          setDataContent((prev) => [...prev, responseData]);
        }
      }
    }
    loadQsheetList();
  }, [idList]);

  const columns = useMemo(
    () => [
      {
        Header: "절차",
        accessor: "process",
      },
      {
        Header: "행위자",
        accessor: "actor",
      },
      {
        Header: "내용",
        accessor: "content",
        filterable: false,
      },
      {
        Header: "파일",
        accessor: "updated_at",
        Cell: (cell) => (
          <div style={{}}>
            <label
              htmlFor={`fileInput-${cell.row.index}`}
              className="cursor-pointer flex items-center "
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
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
      },
    ],
    [dataContent]
  );
  console.info("dataContent", dataContent);
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

  return (
    <Modal
      fade={true}
      isOpen={show}
      toggle={onCloseClick}
      centered={true}
      size="xl"
      fullscreen="xl"
    >
      <ModalBody>
        {dataContent.length > 0 && (
          <div ref={componentRef}>
            {dataContent.map((data, index) => (
              <TableContainer
                key={`data-${index}`}
                columns={columns}
                data={data}
                // isGlobalFilter={true}
                isAddUserList={false}
                customPageSize={10}
                className="custom-header-css"
                divClass="table-responsive mb-1 table-card"
                tableClass="mb-0 align-middle table-nowrap"
                theadClass="table-light text-muted"
                pagination={false}
                // isProductsFilter={true}
                // SearchPlaceholder="Search Products..."
              />
            ))}
          </div>
        )}
        <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
          <button
            type="button"
            className="btn w-sm btn-light"
            data-bs-dismiss="modal"
            onClick={onCloseClick}
          >
            닫기
          </button>
          <button
            type="button"
            className="btn w-sm btn-success"
            id="delete-record"
            onClick={clickPrint}
          >
            인쇄하기
          </button>
        </div>
      </ModalBody>
    </Modal>
  );
};

PrintCueSheetModal.propTypes = {
  onCloseClick: PropTypes.func,
  onLoadClick: PropTypes.func,
  show: PropTypes.any,
};

export default PrintCueSheetModal;
