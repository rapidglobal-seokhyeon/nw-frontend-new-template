import {
  HiCheckCircle,
  HiInformationCircle,
  HiExclamation,
  HiXCircle,
} from "react-icons/hi";

const ICONS = {
  success: {
    color: "text-emerald-400",
    icon: <HiCheckCircle />,
  },
  info: {
    color: "text-blue-400",
    icon: <HiInformationCircle />,
  },
  warning: {
    color: "text-yellow-400",
    icon: <HiExclamation />,
  },
  danger: {
    color: "text-red-400",
    icon: <HiXCircle />,
  },
};

const StatusIcon = (props) => {
  const { type = "info", custom, iconColor } = props;

  const icon = ICONS[type];

  return (
    <span className={`text-2xl ${iconColor || icon.color}`}>
      {custom || icon.icon}
    </span>
  );
};

export default StatusIcon;
