import { memo, useMemo } from "react";
import { Button as MuiButton, Tooltip } from "@mui/material";
import type {
  ButtonTypeMap,
  ButtonProps as MuiButtonProps,
  TooltipProps
} from "@mui/material";
import { css, cx } from "@emotion/css";

const cssButton = css`
  font-size: 1.5em;
`;

export type ButtonProps<
  D extends React.ElementType = ButtonTypeMap["defaultComponent"],
  P = {}
> = MuiButtonProps<D, P> & {
  tooltip: TooltipProps["title"];
};

export default memo(function Button({
  className,
  tooltip,
  ...props
}: ButtonProps) {
  const cls = useMemo(() => cx(cssButton, className), [className]);
  return (
    <Tooltip title={tooltip}>
      <span>
        <MuiButton {...{ className: cls, variant: "contained", ...props }} />
      </span>
    </Tooltip>
  );
});
