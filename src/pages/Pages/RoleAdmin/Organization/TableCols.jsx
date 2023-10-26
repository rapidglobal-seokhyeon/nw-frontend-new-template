import React from "react";
import { NavLink } from "react-router-dom";
import { updateOrgEnabled } from "../../../../helpers/organization_helper";

const AppId = (cell) => {
  return (
    <NavLink to="#" className=" fw-medium link-primary">
      {cell.value ? cell.value : ""}
    </NavLink>
  );
};
const Name = (cell) => {
  return <React.Fragment>{cell.value}</React.Fragment>;
};
const Designation = (cell) => {
  return <React.Fragment>{cell.value}</React.Fragment>;
};

const Date = (cell) => {
  return <React.Fragment>{cell.value}</React.Fragment>;
};

const Contact = (cell) => {
  return <React.Fragment>{cell.value}</React.Fragment>;
};
const Type = (cell) => {
  return <React.Fragment>{cell.value}</React.Fragment>;
};

// const Status = (cell) => {
//   // console.log("orgSeq : ", cell.row.original.orgSeq);
//   const onClickConfirm = (e) => {
//     const updateData = e.data.find((a) => a.orgSeq === e.orgSeq);
//     const application = { ...updateData, orgEnabled: !updateData.orgEnabled };
//     // setEnabled(!enabled);
//     updateOrgEnabled(e.orgSeq, application);
//     // location.reload();
//   };
//   return (
//     <React.Fragment>
//       {cell.value === true ? (
//         <button
//           name={cell.row.original.orgSeq}
//           onClick={() => onClickConfirm(cell)}
//           type="button"
//           class="btn btn-soft-success waves-effect waves-light"
//         >
//           승인 완료
//         </button>
//       ) : (
//         <button
//           name={cell.row.original.orgSeq}
//           value={cell.value}
//           onClick={() => onClickConfirm(cell)}
//           type="button"
//           class="btn btn-soft-danger waves-effect waves-light"
//         >
//           진행중
//         </button>
//       )}
//     </React.Fragment>
//   );
// };

export { AppId, Name, Designation, Date, Contact, Type };
