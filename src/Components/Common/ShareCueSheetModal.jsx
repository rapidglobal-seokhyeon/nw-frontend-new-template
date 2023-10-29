import PropTypes from "prop-types";
import React from "react";
import { useEffect } from "react";
import { Modal, ModalBody } from "reactstrap";
import html2canvas from "html2canvas";
import { useCallback } from "react";

const ShareCueSheetModal = ({ show, onCloseClick, seq }) => {
  const imageRef = useCallback((node) => {
    if (node !== null) {
      html2canvas(document.getElementsByClassName("table")[0]).then(
        (canvas) => {
          node.src = canvas.toDataURL("image/png");
        }
      );
    }
  }, []);

  return (
    <Modal
      fade={true}
      isOpen={show}
      toggle={onCloseClick}
      centered={true}
      fullscreen={"xl"}
      size={"xl"}
    >
      <ModalBody className="py-3 px-5">
        <div
          className=" text-center"
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
            <h4>공유 큐시트 주소</h4>
            <input
              value={seq}
              style={{
                width: "100%",
                padding: "10px 5px",
              }}
              readOnly={true}
            />
          </div>
        </div>
        <img
          ref={imageRef}
          style={{
            maxWidth: "100%",
          }}
        />

        <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
          <button
            type="button"
            className="btn w-sm btn-light"
            data-bs-dismiss="modal"
            onClick={onCloseClick}
          >
            닫기
          </button>
        </div>
      </ModalBody>
    </Modal>
  );
};

ShareCueSheetModal.propTypes = {
  onCloseClick: PropTypes.func,
  onLoadClick: PropTypes.func,
  show: PropTypes.any,
};

export default ShareCueSheetModal;
