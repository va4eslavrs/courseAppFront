import React, { useState, useLayoutEffect, useRef, useEffect } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import TextArea from "react-validation/build/textarea";
import Select from "react-validation/build/select";
import { TagsInput } from "react-tag-input-component";
import authHeader from "../services/auth-header";
import ServerHost from "../serverhosts";
import Service from "../services/auth.service";
import axios from "axios";
const CreatePost = (props) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [validFiles, setValidFiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [unsupportedFiles, setUnsupportedFiles] = useState([]);
  const [tools, setTools] = useState("");
  const [tags, setTags] = useState([]);
  const [topicvalue, setTopicValue] = useState("");
  const [text, setText] = useState("");
  const [theme, setTheme] = useState("");
  const [photos, setPhotos] = useState([]);
  const [block, setblock] = useState(false);
  useLayoutEffect(() => {
    axios
      .get(ServerHost.apiInfoTools(), {
        headers: authHeader(),
      })
      .then(
        (response) => {
          setTools(response.data);
          setTags(response.data.tags);
        },
        (err) => {
          const errMessage =
            (err.response && err.response.data && err.response.data.message) ||
            err.message ||
            err.toString();
          alert(errMessage);
        }
      );
  }, []);
  const form = useRef();
  //drag drop
  const dragOver = (e) => {
    e.preventDefault();
  };
  const dragEnter = (e) => {
    e.preventDefault();
  };
  const dragLeave = (e) => {
    e.preventDefault();
  };
  const removeFile = (e) => {
    const indexInValid = validFiles.findIndex((el) => el.name === e);
    validFiles.splice(indexInValid, 1);
    setValidFiles([...validFiles]);
    const indexInSelectedFiles = selectedFiles.findIndex((el) => el.name === e);
    selectedFiles.splice(indexInSelectedFiles, 1);
    setSelectedFiles([...selectedFiles]);
    const unsupportedFileIndex = unsupportedFiles.findIndex(
      (el) => el.name === e
    );
    if (unsupportedFileIndex !== -1) {
      unsupportedFiles.splice(unsupportedFileIndex, 1);
      setUnsupportedFiles([...unsupportedFiles]);
    }
  };
  const validateFile = (file) => {
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
    return validTypes.indexOf(file.type) === -1 ? false : true;
  };

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
  const uploadFiles = () => {
    for (let i = 0; i < validFiles.length; i++) {
      const formData = new FormData();
      formData.append("image", validFiles[i]);
      formData.append("key", tools.photoServiceKey);
      axios.post(tools.photoServiceHost, formData).then((response) => {
        const photo = {
          address: response.data.data.url,
          deletelink: response.data.data.deleteUrl,
          thumb: response.data.data.thumb.url,
        };
        setPhotos((arr) => [...arr, photo]);
      });
    }
    setblock(true);
  };

  const handleFiles = (files) => {
    for (let i = 0; i < files.length; i++) {
      if (validateFile(files[i])) {
        setValidFiles((prevArray) => [...prevArray, files[i]]);
        setSelectedFiles((prevArray) => [...prevArray, files[i]]);
      } else {
        files[i]["invalid"] = true;
        setSelectedFiles((prevArray) => [...prevArray, files[i]]);
        setErrorMessage("wrong file type");
        setUnsupportedFiles((prevArray) => [...prevArray, files[i]]);
      }
    }
  };
  //end drag
  const onChangeText = (e) => {
    const text = e.target.value;
    setText(text);
  };
  const onChangeTheme = (e) => {
    const theme = e.target.value;
    setTheme(theme);
  };
  const onChangeTopic = (e) => {
    const topicvalue = e.target.value;
    setTopicValue(topicvalue);
  };
  const handleCreation = (e) => {
    e.preventDefault();
    Service.add(text, tags, photos, theme, topicvalue);
  };

  return (
    <div className="container">
      <Form onSubmit={handleCreation} ref={form}>
        <div className="form-group">
          <label>Text</label>
          <TextArea
            type="text"
            className="form-control"
            name="text"
            value={text}
            onChange={onChangeText}
            rows="3"
          ></TextArea>
        </div>
        <div className="form-group">
          <label>Theme</label>
          <Select
            type="text"
            className="form-control"
            value={theme}
            onChange={onChangeTheme}
          >
            {tools.themes &&
              tools.themes.map((theme, index) => (
                <option key={index}>{theme}</option>
              ))}
          </Select>
        </div>
        <div className="form-group">
          <label>Topic of this</label>
          <Input
            type="text"
            className="form-control"
            value={topicvalue}
            onChange={onChangeTopic}
          />
        </div>
        <label>Tags</label>
        <pre></pre>
        <div className="form-control">
          <TagsInput type="text" value={tags} onChange={setTags} />
        </div>
        <div> tags: {tags.toString()}</div>
        <div>
          <p className="title">files dropped here</p>
          <div>
            {photos.length &&
              photos.map((photo, index) => (
                <div>
                  <img key={index} src={photo.address} />
                </div>
              ))}
          </div>
          <div className="content">
            <div className="container">
              {!block &&
              unsupportedFiles.length === 0 &&
              validFiles.length > 0 &&
              selectedFiles.length < 4 ? (
                <button
                  className="btn btn-primary"
                  onClick={() => uploadFiles()}
                >
                  Upload Files
                </button>
              ) : (
                ""
              )}
              {unsupportedFiles.length ? (
                <p>Please remove all unsupported files.</p>
              ) : (
                ""
              )}
              {selectedFiles.length > 3 ? <p>max number of files is 3!</p> : ""}
              <div className="form-control">
                <div
                  className="drop-container"
                  onDragOver={dragOver}
                  onDragEnter={dragEnter}
                  onDragLeave={dragLeave}
                  onDrop={fileDrop}
                >
                  <div className="drop-message">drag&drop 3 images</div>
                </div>
              </div>
              {!block && (
                <div className="file-display-container">
                  {selectedFiles.map((data, i) => (
                    <div className="file-status-bar" key={i}>
                      <div>
                        <div className="file-type">{fileType(data.name)}</div>
                        <span
                          className={`file-name ${
                            data.invalid ? "file-error" : ""
                          }`}
                        >
                          {data.name}
                        </span>
                        {data.invalid && (
                          <span className="file-error-message">
                            ({errorMessage})
                          </span>
                        )}
                      </div>
                      <div
                        className="file-remove"
                        onClick={() => removeFile(data.name)}
                      >
                        X
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="form-group">
          <button type="Submit" className="btn btn-primary btn-block">
            add posts
          </button>
        </div>
      </Form>
    </div>
  );
};

export default CreatePost;
