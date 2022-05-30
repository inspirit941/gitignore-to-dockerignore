import { css, cx } from "@emotion/css";
import g2d from "@g2d/core";
import Editor from "@monaco-editor/react";
import { FormControlLabel, Switch, useEventCallback } from "@mui/material";
import useToggle from "@react-hook/toggle";
import copy from "copy-to-clipboard";
import { saveAs } from "file-saver";
import { useSnackbar } from "notistack";
import {
  ArrowCounterClockwise,
  Clipboard,
  FloppyDisk,
  UploadSimple
} from "phosphor-react";
import React, { memo, useEffect, useState } from "react";
import type { DropzoneOptions } from "react-dropzone";
import { useDropzone } from "react-dropzone";
import BlockTitle from "./BlockTitle";
import Button from "./Button";
import defaultGitIgnore from "./defaultGitIgnore";

const cssTransformer = css`
  max-width: 100%;
  display: flex;
  border: 1px solid #ccc;
  border-radius: 4px;
  gap: 2em;
  flex-direction: row;
  & > * {
    flex: 1;
    border: 1px solid #ccc;
    position: relative;
  }
  @media (max-width: 1600px) {
    flex-direction: column;
    & > * {
      width: 100%;
    }
  }
`;

const cssDropFile = css`
  &:after {
    content: "Upload .gitignore";
    font-size: 5em;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    background: var(--background);
    position: absolute;
    inset: 0;
  }
`;

export default memo(function Transformer() {
  const { enqueueSnackbar } = useSnackbar();
  const [gitignore, setGitignore] = useState(defaultGitIgnore);
  const [dockerignore, setDockerignore] = useState('');
  // const [dockerignore, setDockerignore] = useState(() => g2d(gitignore));
  const [readonly, toggleReadonly] = useToggle(false, true, false);
  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     setDockerignore(g2d(gitignore));
  //   }, 300);
  //   return () => {
  //     clearTimeout(timeout);
  //   };
  // }, [gitignore]);

  const setResponse = (str: string | void) => {
    if (str)
      setDockerignore(str);
  }
  // TODO : test
  const convert = () => {
    const form = new FormData()
    form.append("file", new Blob([gitignore], {type: 'text/plain'}), "Jenkins");

    fetch('/api/v1/upload', {
      headers: {
        'accept': 'application/json',
      },
      body: form,
      method: "POST",
    })
        .then(response => response.text())
        .catch(error => console.error('Error:', error))
        .then(response => {
          console.log('Success:', response)
          setResponse(response)
          return response;
        });
  }

  const onDrop = useEventCallback<
    Parameters<NonNullable<DropzoneOptions["onDrop"]>>,
    void
  >(async (acceptedFiles, fileRejections) => {
    const file = acceptedFiles[0] || fileRejections[0]?.file;
    if (!file) {
      enqueueSnackbar("File failed to loaded!", { variant: "error" });
      return;
    }
    const content = await file.text();
    setGitignore(content);
    enqueueSnackbar("File loaded!", {
      variant: "success"
    });
    const response = convert();
  });
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ".gitignore",
    multiple: false
  });
  const reset = useEventCallback(() => {
    setGitignore(defaultGitIgnore);
    enqueueSnackbar("Reset!", {
      variant: "success"
    });
  });
  // don't memo it
  const rootProps = getRootProps();
  const copyToClipboard = useEventCallback(() => {
    const success = copy(dockerignore);
    if (success)
      enqueueSnackbar("Copied!", {
        variant: "success"
      });
    else
      enqueueSnackbar("Failed to copy!", {
        variant: "error"
      });
  });

  const save = useEventCallback(() => {
    saveAs(
      new Blob([dockerignore], { type: "text/plain;charset=utf-8" }),
      ".dockerignore"
    );
    enqueueSnackbar("File saving...", {
      variant: "info"
    });
  });
  return (
    <div className={cssTransformer}>
      <div
        className={cx(isDragActive && cssDropFile)}
        {...{ ...rootProps, onClick: undefined }}
      >
        <input {...getInputProps()} />
        <BlockTitle
          title=".gitignore"
          actions={
            <>
              <FormControlLabel
                control={<Switch value={readonly} onClick={toggleReadonly} />}
                label="Readonly"
              />
              <Button tooltip="Reset" onClick={reset}>
                <ArrowCounterClockwise />
              </Button>
              <Button tooltip="Upload .gitignore" onClick={rootProps.onClick}>
                <UploadSimple />
              </Button>
            </>
          }
        />
        <Editor
          value={gitignore}
          onChange={(v) => {
            if (readonly) return;
            const newContent = v || "";
            if (newContent.replace(/\r/g, "") === gitignore) return;
            setGitignore(newContent);
          }}
          height="500px"
          language="ini"
          theme="vs-dark"
          options={{ readOnly: readonly, automaticLayout: true }}
        />
      </div>
      <div>
        <BlockTitle
          title=".dockerignore"
          actions={
            <>
              <Button tooltip="Copy to clipboard" onClick={copyToClipboard}>
                <Clipboard />
              </Button>
              <Button tooltip="Save as .dockerignore" onClick={save}>
                <FloppyDisk />
              </Button>
            </>
          }
        />
        <Editor
          value={dockerignore}
          language="ini"
          height="500px"
          theme="vs-dark"
          options={{ readOnly: true, automaticLayout: true }}
        />
      </div>
    </div>
  );
});
