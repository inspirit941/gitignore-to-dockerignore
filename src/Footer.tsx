import { css } from "@emotion/css";
import { memo } from "react";
import ExternalLink from "./ExternalLink";

const cssFooter = css`
  & img {
    max-width: 100%;
    width: 128px;
  }
`;

// todo: 레포 페이지 생기면 추가.
const officialSite = "//vdustr.dev/g2d.js";
const imgUrl = "https://user-images.githubusercontent.com/26548454/170813693-43f52bb6-2399-4de3-9b2b-6b788c801ea1.png";
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
