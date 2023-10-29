import { forwardRef } from "react";
import classNames from "classnames";
import { useConfig } from "../ConfigProvider";
import Addon from "./Addon";
import { useForm } from "../Form/context";
import {
  InputGroupContextProvider,
  InputGroupContextConsumer,
} from "./context";

const InputGroup = forwardRef((props, ref) => {
  const { children, className, size } = props;

  const { controlSize } = useConfig();
  const formControlSize = useForm()?.size;

  const inputGroupSize = size || formControlSize || controlSize;

  const inputGroupClass = classNames("input-group", className);

  const contextValue = {
    size: inputGroupSize,
  };
  return (
    <InputGroupContextProvider value={contextValue}>
      <InputGroupContextConsumer>
        {() => {
          return (
            <div ref={ref} className={inputGroupClass}>
              {children}
            </div>
          );
        }}
      </InputGroupContextConsumer>
    </InputGroupContextProvider>
  );
});

InputGroup.displayName = "InputGroup";
InputGroup.Addon = Addon;
export default InputGroup;
