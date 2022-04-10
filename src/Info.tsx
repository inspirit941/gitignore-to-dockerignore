import { memo } from "react";
import { Alert } from "@mui/material";

export default memo(function Info() {
  return (
    <Alert severity="info" sx={{ textAlign: "left" }}>
      {
        "Notice that Monaco Editor and copying to clipboard will remove CR (Carriage Return) so if you want to keep it, switch on readonly then upload your .gitignore and download the .dockerignore ."
      }
    </Alert>
  );
});
