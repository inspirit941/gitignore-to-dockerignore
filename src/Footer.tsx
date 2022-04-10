import { css } from "@emotion/css";
import { memo } from "react";
import ExternalLink from "./ExternalLink";

const cssFooter = css`
  & img {
    max-width: 100%;
    width: 128px;
  }
`;

const officialSite = "//vdustr.dev/g2d.js";
const imgUrl = "//vdustr.dev/g2d.js/img/g2d.svg";
const authorSite = "//vdustr.dev";
const licenseUrl = "//github.com/VdustR/g2d.js/blob/main/LICENSE";

export default memo(function () {
  return (
    <footer className={cssFooter}>
      <p>
        <ExternalLink href={officialSite}>
          <img src={imgUrl} alt="g2d logo" />
        </ExternalLink>
      </p>
      <p>
        {"Built with "}
        <ExternalLink href={officialSite}>{"g2d"}</ExternalLink>
        {" by "}
        <ExternalLink href={authorSite}>{"ViPro"}</ExternalLink>
        {" under "}
        <ExternalLink href={licenseUrl}>{"MIT License"}</ExternalLink>
      </p>
    </footer>
  );
});
