import { getQsheetList } from "@/helpers/Cuesheet/cuesheet_helper";
import PropTypes from "prop-types";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Modal, ModalBody } from "reactstrap";

const LoadCueSheetModal = ({ show, onLoadClick, onCloseClick }) => {
  const [address, setAddress] = useState("");
  const [qsheetList, setQsheetList] = useState([]);
  useEffect(() => {
    async function loadQsheetList() {
      const result = await getQsheetList();
      setQsheetList(result.content);
      console.info("result", result);
    }
    loadQsheetList();
  }, []);
  return (
    <Modal fade={true} isOpen={show} toggle={onCloseClick} centered={true}>
      <ModalBody className="py-3 px-5">
        <div className="mt-2 text-center">
          <lord-icon
            src="https://cdn.lordicon.com/gsqxdxog.json"
            trigger="loop"
            colors="primary:#f7b84b,secondary:#f06548"
            style={{ width: "100px", height: "100px" }}
          ></lord-icon>
          <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-4">
            <h4>불러올 큐시트 주소를 입력해주세요</h4>
            <p className="text-muted mx-4 mb-0">
              <input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </p>
          </div>
          <div>
            <select onChange={(e) => setAddress(e.target.value)}>
              {qsheetList.map((qsheet) => (
                <option value={qsheet.qsheetSeq}>{qsheet.name}</option>
              ))}
            </select>
          </div>
        </div>
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
            className="btn w-sm btn-danger "
            id="delete-record"
            onClick={() => onLoadClick(address)}
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
