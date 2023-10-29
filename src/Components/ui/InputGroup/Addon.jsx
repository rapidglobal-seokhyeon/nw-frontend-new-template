import { forwardRef } from "react";
import classNames from "classnames";
import { useConfig } from "../ConfigProvider";
import { useForm } from "../Form/context";
import { useInputGroup } from "./context";
import { CONTROL_SIZES } from "../utils/constants";

const Addon = forwardRef((props, ref) => {
  const { size, children, className } = props;

  const { controlSize } = useConfig();
  const formControlSize = useForm()?.size;
  const inputGroupSize = useInputGroup()?.size;

  const inputAddonSize =
    size || inputGroupSize || formControlSize || controlSize;

  const addonClass = classNames(
    "input-addon",
    `input-addon-${inputAddonSize} h-${CONTROL_SIZES[inputAddonSize]}`,
    className
  );

  return (
    <div ref={ref} className={addonClass}>
      {children}
    </div>
  );
});

Addon.displayName = "Addon";

export default Addon;
