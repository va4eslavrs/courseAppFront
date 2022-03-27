import React, { useState, useEffect } from "react";
import DropzoneCSS from "../Dropzone.css";

const Dropzone = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [validFiles, setValidFiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const dragOver = (e) => {
    e.preventDefault();
  };
  const dragEnter = (e) => {
    e.preventDefault();
  };
  const dragLeave = (e) => {
    e.preventDefault();
  };
  const validateFile = (file) => {
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
    return validTypes.indexOf(file.type) === -1 ? false : true;
  };
  useEffect(() => {
    let filteredArray = selectedFiles.reduce((file, current) => {
      return file.find((item) => item.name === current.name)
        ? file.concat([current])
        : file;
    }, []);
    setValidFiles([...filteredArray]);
  }, [selectedFiles]);

  const fileDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length) {
      handleFiles(files);
    }
  };
  const fileType = (fileName) => {
    return (
      fileName.substring(fileName.lastIndexOf(".") + 1, fileName.length) ||
      fileName
    );
  };

  const handleFiles = (files) => {
    for (let i = 0; i < files.length; i++) {
      if (validateFile(i)) {
        setSelectedFiles((prevArray) => [...prevArray, files[i]]);
      } else {
        files[i]["invalid"] = true;
        setSelectedFiles((prevArray) => [...prevArray, files[i]]);
        setErrorMessage("wrong file type");
      }
    }
  };
  return (
    <div className="container">
      <div
        className="drop-container"
        onDragOver={dragOver}
        onDragEnter={dragEnter}
        onDragLeave={dragLeave}
        onDrop={fileDrop}
      >
        <div className="drop-message">
          <div className="drop-icon"></div>
          drag&drop 3 images
        </div>
      </div>
      <div className="file-display-container">
        {validFiles.map((data, i) => (
          <div className="file-status-bar" key={i}>
            <div>
              <div className="file-type">{fileType(data.name)}</div>
              <span className={`file-name ${data.invalid ? "file-error" : ""}`}>
                {data.name}
              </span>
              {data.invalid && (
                <span className="file-error-message">({errorMessage})</span>
              )}
            </div>
            <div className="file-remove">X</div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Dropzone;
