import React, { useState, useEffect } from "react";
import axios from "axios";
import ServerHost from "../serverhosts";
import authHeader from "../services/auth-header";

const HomePublicPrivate = () => {
  const [content, setContent] = useState([]);
  useEffect(() => {
    axios
      .get(ServerHost.apiInfoPrivate(), {
        headers: authHeader(),
      })
      .then(
        (response) => {
          setContent(response.data);
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

  return (
    <div>
      <div>
        <h3>private posts</h3>
        <div>
          <div>content not null??</div>
          {content && (
            <div>
              <div>{content.length}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default HomePublicPrivate;
