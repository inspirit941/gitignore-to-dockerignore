import { Link } from "@mui/material";
import type { LinkProps, LinkTypeMap } from "@mui/material";
import { memo } from "react";

export type ExternalLinkProps<
  D extends React.ElementType = LinkTypeMap["defaultComponent"],
  P = unknown
> = LinkProps<D, P>;

export default memo(function ExternalLink(props: ExternalLinkProps) {
  return (
    <Link {...{ ...props, target: "_blank", rel: "noopener noreferrer" }} />
  );
});
