import React, { useState, useEffect } from "react";
import axios from "axios";
import ServerHost from "../serverhosts";
import authHeader from "../services/auth-header";

export default function ContentComponent() {
  const [content, setContent] = useState([
    {
      publicPostsResponse: {
        id: "",
        text: "",
        creationDate: "",
        rating: "",
        photos: [{ address: "", deletelink: "", thumb: "" }],
        theme: "",
        topic: "",
        tags: [],
        author: "",
      },
      rate: "",
      owner: false,
    },
  ]);
  const deletion = (index) => {
    const id = content[index].id;
  };

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
          <div>
            {content.length &&
              content.map((item, index) => (
                <div className="form-control">
                  <div>
                    <div></div>
                    <div>
                      <h4> {item.publicPostsResponse.topic}</h4>
                      <div>раздел: {item.publicPostsResponse.theme}</div>
                    </div>
                    <div>
                      <div>
                        {item.publicPostsResponse.photos.length > 0 &&
                          item.publicPostsResponse.photos.map((photo, num) => (
                            <img key={num} src={photo.thumb} />
                          ))}
                      </div>
                    </div>
                    <div key={index}>{item.publicPostsResponse.text}</div>
                    {item.owner && (
                      <div>
                        <button
                          className="btn btn-outline-dark btn-sm"
                          onClick={(e) => {
                            e.target.parentElement.parentElement.style.display =
                              "none";
                            deletion(index);
                          }}
                        >
                          delete
                        </button>
                        <button
                          className="btn btn-outline-dark btn-sm"
                          key={index}
                        >
                          edit
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
