import {
  getQSheetCardDetails,
  getQsheetList,
} from "@/helpers/Cuesheet/cuesheet_helper";
import PropTypes from "prop-types";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Modal, ModalBody } from "reactstrap";
import TableContainer from "./TableContainer";
import { useMemo } from "react";

const LoadCueSheetModal = ({ show, onLoadClick, onCloseClick }) => {
  const [address, setAddress] = useState("");
  const [qsheetList, setQsheetList] = useState([]);
  const [dataContent, setDataContent] = useState();

  const [selectedIndex, setSelectedIndex] = useState([]);
  useEffect(() => {
    async function loadQsheetList() {
      const result = await getQsheetList();
      setQsheetList(result.content);
    }
    loadQsheetList();
  }, []);

  const columns = useMemo(
    () => [
      {
        id: "check",
        Header: (
          <input
            type="checkbox"
            onChange={(e) => {
              if (e.target.checked) {
                setSelectedIndex(dataContent.map((data) => data.orderIndex));
              } else {
                setSelectedIndex([]);
              }
            }}
          />
        ),
        Cell: (cell) => {
          return (
            <input
              type="checkbox"
              className="productCheckBox form-check-input"
              checked={selectedIndex.includes(cell.row.original.orderIndex)}
              onClick={() => {
                console.info("cell.row.original", cell.row.original);
                if (selectedIndex.includes(cell.row.original.orderIndex)) {
                  setSelectedIndex(
                    selectedIndex.filter(
                      (data) => data !== cell.row.original.orderIndex
                    )
                  );
                } else {
                  setSelectedIndex([
                    ...selectedIndex,
                    cell.row.original.orderIndex,
                  ]);
                }
              }}
            />
          );
        },
      },
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
    [dataContent, selectedIndex]
  );

  return (
    <Modal fade={true} isOpen={show} toggle={onCloseClick} centered={true}>
      <ModalBody className="py-3 px-5">
        <div
          className="mt-2 text-center"
          style={{
            marginBottom: 20,
          }}
        >
          <lord-icon
            src="https://cdn.lordicon.com/gsqxdxog.json"
            trigger="loop"
            colors="primary:#f7b84b,secondary:#f06548"
            style={{ width: "100px", height: "100px" }}
          ></lord-icon>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            <h4>불러올 큐시트 주소를 입력해주세요</h4>
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="URL"
              style={{
                width: "100%",
                padding: "10px 5px",
              }}
            />
            <select
              onChange={(e) => setAddress(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 5px",
              }}
            >
              {" "}
              <option value="">-----</option>
              {qsheetList.map((qsheet) => (
                <option value={qsheet.qsheetSeq}>{qsheet.name}</option>
              ))}
            </select>
            <button
              type="button"
              className="btn w-sm btn-danger "
              id="delete-record"
              disabled={!address}
              onClick={async () => {
                const data = await getQSheetCardDetails(address);
                if (data) {
                  const responseData = data?.data;

                  setDataContent(responseData);
                  setSelectedIndex([]);
                }
              }}
            >
              데이터 불러오기
            </button>
          </div>
        </div>
        {dataContent && (
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
            onClick={() =>
              onLoadClick(
                dataContent.filter((data) =>
                  selectedIndex.includes(data.orderIndex)
                )
              )
            }
          >
            불러오기
          </button>
        </div>
      </ModalBody>
    </Modal>
  );
};

LoadCueSheetModal.propTypes = {
  onCloseClick: PropTypes.func,
  onLoadClick: PropTypes.func,
  show: PropTypes.any,
};

export default LoadCueSheetModal;
