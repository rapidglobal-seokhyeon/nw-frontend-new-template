import PropTypes from "prop-types";
import React from "react";
import { useEffect } from "react";
import { Modal, ModalBody } from "reactstrap";
import html2canvas from "html2canvas";
import { useCallback } from "react";
import { uploadFile } from "@/helpers/File/file_helper";
import { dataURItoBlob } from "@/utils/dataURIToBlob";
import { useState } from "react";

const ShareCueSheetModal = ({ show, onCloseClick, seq }) => {
  const [content, setContent] = useState("");
  useEffect(() => {
    html2canvas(document.getElementsByClassName("table")[0]).then(
      async (canvas) => {
        const blob = dataURItoBlob(canvas.toDataURL("image/png"));
        const formData = new FormData(document.forms[0]);
        formData.append(`files`, blob);
        try {
          // Axios나 fetch 등을 사용하여 API로 FormData를 POST 요청으로 보냅니다.

          const response = await uploadFile(formData);

          // API 응답을 필요에 따라 처리합니다.
          setContent(`
            <div>
              공유 코드 : <b>${seq}</b>
            </div>
            <div>
              <img src="http://152.69.228.245:10001${response.data[0]}" width='100%' />
            </div>
          `);
          console.log(response.data);
        } catch (error) {
          // 에러를 처리합니다.
          console.error(error);
        }
      }
    );
  }, []);
  console.info("cont", content);
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
            <h4>공유 </h4>
            <textarea
              value={content}
              readOnly={true}
              style={{
                width: "100%",
                height: 200,
              }}
            />
          </div>
        </div>
        <div>미리보기</div>
        <div dangerouslySetInnerHTML={{ __html: content }}></div>
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
