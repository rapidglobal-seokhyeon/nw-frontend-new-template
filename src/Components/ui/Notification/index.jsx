import { forwardRef, useCallback, useState } from "react";
import classNames from "classnames";
import useTimeout from "@components/Hooks/useTimeout";
import CloseButton from "../CloseButton";
import StatusIcon from "../StatusIcon";

const Notification = forwardRef((props, ref) => {
  const {
    className,
    children,
    closable = false,
    customIcon,
    duration = 3000,
    onClose,
    style,
    title,
    triggerByToast,
    type,
    width = 350,
    ...rest
  } = props;

  const [display, setDisplay] = useState("show");

  const { clear } = useTimeout(onClose, duration, duration > 0);

  const handleClose = useCallback(
    (e) => {
      setDisplay("hiding");
      onClose?.(e);
      clear();
      if (!triggerByToast) {
        setTimeout(() => {
          setDisplay("hide");
        }, 400);
      }
    },
    [onClose, clear, triggerByToast]
  );

  const notificationClass = classNames("notification", className);

  if (display === "hide") {
    return null;
  }

  return (
    <div
      ref={ref}
      {...rest}
      className={notificationClass}
      style={{ width: width, ...style }}
    >
      <div
        className={classNames("notification-content", !children && "no-child")}
      >
        {type && !customIcon ? (
          <div className="mr-3">
            <StatusIcon type={type} />
          </div>
        ) : null}
        {customIcon && <div className="mr-3">{customIcon}</div>}
        <div className="mr-4">
          {title && (
            <div
              className={classNames("notification-title", children && "mb-1")}
            >
              {title}
            </div>
          )}
          <div className="notification-description">{children}</div>
        </div>
      </div>
      {closable && (
        <CloseButton
          className="notification-close"
          defaultStyle={false}
          absolute={true}
          onClick={handleClose}
        />
      )}
    </div>
  );
});

Notification.displayName = "Notification";

export default Notification;
