import React, { useState, useLayoutEffect, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import TextArea from "react-validation/build/textarea";
import Select from "react-validation/build/select";
import { TagsInput } from "react-tag-input-component";
import authHeader from "../services/auth-header";
import ServerHost from "../serverhosts";
import Dropzone from "./Dropzone";
import axios from "axios";
const CreatePost = (props) => {
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
  const [tools, setTools] = useState("");
  const [tags, setTags] = useState([]);
  const [topicvalue, setTopicValue] = useState("");
  const [text, setText] = useState("");
  const [theme, setTheme] = useState("");
  const [photos, setPhotos] = useState([]);
  const form = useRef();

  const onChangeText = (e) => {
    const text = e.target.value;
    setText(text);
  };
  const onChangeTheme = (e) => {
    const theme = e.target.value;
    setTheme(theme);
  };
  const onChangePhotos = (e) => {};

  const onChangeTopic = (e) => {
    const topicvalue = e.target.value;
    setTopicValue(topicvalue);
  };
  const handleCreation = (e) => {
    e.preventDefault();
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
          <p className="title">React Drag and Drop Image Upload</p>

          <div className="content">
            <Dropzone />
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
