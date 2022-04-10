import { css, cx } from "@emotion/css";
import React, { ComponentPropsWithoutRef, memo, useMemo } from "react";
import type { ReactNode } from "react";

export type TitleProps = Omit<ComponentPropsWithoutRef<"h2">, "children"> & {
  title?: ReactNode;
  actions?: ReactNode;
};

const cssTitle = css`
  display: flex;
  font-size: 1.2em;
  align-items: center;
  gap: 1em;
  justify-content: space-between;
  margin: 0.5em 0.5em;
  flex-wrap: wrap;
`;

const cssActions = css`
  display: flex;
  align-items: center;
  gap: 0.5em;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export default memo(function Title({
  className,
  title,
  actions,
  ...props
}: TitleProps) {
  const cls = useMemo(() => cx(cssTitle, className), [className]);
  return (
    <h2 {...{ className: cls, ...props }}>
      <span>{title}</span>
      <span className={cssActions}>{actions}</span>
    </h2>
  );
});
