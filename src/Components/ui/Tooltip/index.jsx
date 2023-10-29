import { useState, useCallback, useRef, useEffect } from "react";
import classNames from "classnames";
import { Popper, Reference, Manager } from "react-popper";
import { motion, AnimatePresence } from "framer-motion";
import Arrow from "./Arrow";
import { Portal } from "react-portal";

const PopperElement = (props) => {
  const { title, forceUpdate, open } = props;
  useEffect(() => {
    if (open) {
      forceUpdate();
    }
  }, [open]);
  return <span>{title}</span>;
};

const Tooltip = (props) => {
  const {
    className,
    children,
    isOpen = false,
    placement = "top",
    title,
    wrapperClass,
    ...rest
  } = props;

  const [tooltipOpen, setTooltipOpen] = useState(isOpen);
  const tooltipNode = useRef();

  const tooltipBackground = "gray-800";
  const tooltipDarkBackground = "black";

  const defaultTooltipClass = `tooltip bg-${tooltipBackground} dark:bg-${tooltipDarkBackground}`;

  const toggleTooltip = useCallback(
    (bool) => {
      if (!isOpen) {
        setTooltipOpen(bool);
      }
    },
    [isOpen]
  );

  return (
    <Manager>
      <Reference>
        {({ ref }) => (
          <span
            ref={ref}
            className={classNames("tooltip-wrapper", wrapperClass)}
            onMouseEnter={() => toggleTooltip(true)}
            onMouseLeave={() => toggleTooltip(false)}
          >
            {children}
          </span>
        )}
      </Reference>
      {tooltipOpen && (
        <Portal>
          <Popper
            placement={placement}
            innerRef={(node) => (tooltipNode.current = node)}
            modifiers={[
              {
                name: "arrow",
                options: {
                  element,
                },
              },
              { name: "offset", options: { offset: [0, 7] } },
            ]}
            strategy={"fixed"}
          >
            {({ ref, style, ...popperProps }) => (
              <AnimatePresence>
                <motion.div
                  ref={ref}
                  className={classNames(defaultTooltipClass, className)}
                  style={style}
                  initial={{
                    opacity: 0,
                    visibility: "hidden",
                  }}
                  animate={
                    tooltipOpen
                      ? {
                          opacity: 1,
                          visibility: "visible",
                        }
                      : {
                          opacity: 0,
                          visibility: "hidden",
                        }
                  }
                  transition={{
                    duration: 0.15,
                    type: "tween",
                  }}
                >
                  <PopperElement
                    open={tooltipOpen}
                    title={title}
                    {...rest}
                    {...popperProps}
                  />
                  <Arrow
                    placement={placement}
                    color={tooltipBackground}
                    colorDark={tooltipDarkBackground}
                  />
                </motion.div>
              </AnimatePresence>
            )}
          </Popper>
        </Portal>
      )}
    </Manager>
  );
};

Tooltip.displayName = "Tooltip";

export default Tooltip;
