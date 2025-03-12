import React from "react";
import error from "../../assets/icons/alert/error.svg";
import success from "../../assets/icons/alert/success.svg";
import close from "../../assets/icons/alert/close.svg";
import closeSuccess from "../../assets/icons/alert/closeSuccess.svg";
import classNames from "classnames";

type AlertProps = {
  id: string;
  open: boolean;
  handleClose: (id: string) => void;
  data: {
    message: string;
    type: "error" | "success";
  }; // Adjust the type as per your requirement
};

const Alert: React.FC<AlertProps> = ({
  id,
  open,
  handleClose,
  data = {
    type: "error",
    message: "unexpected error",
  },
}) => {
  // const handleOk = () => {
  //   handleClose(id)
  // }

  const handleCancel = () => {
    handleClose(id);
  };

  const alertCls = classNames("alert", {
    [`open-alert-${data.type}`]: open,
    [`open-alert`]: open,
  });

  return (
    <div className={alertCls} title="alert">
      <div className="message-container">
        <img src={renderImage(data.type)} alt="" />
        <p>{data.message}</p>
      </div>
      <img
        onClick={handleCancel}
        className="close"
        src={renderClose(data.type)}
        alt=""
      />
    </div>
  );
};

export default Alert;

const renderImage = (type: "success" | "error") => {
  switch (type) {
    case "error":
      return error;
    case "success":
      return success;
    default:
      return error;
  }
};

const renderClose = (type: "success" | "error") => {
  switch (type) {
    case "error":
      return close;
    case "success":
      return closeSuccess;
    default:
      return closeSuccess;
  }
};
