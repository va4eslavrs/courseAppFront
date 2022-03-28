import React, { useState, useEffect } from "react";
import axios from "axios";
import ServerHost from "../serverhosts";
import authHeader from "../services/auth-header";

export default function ContentComponent() {
  const [isLoaded, setIsLoaded] = useState(false);
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
  useEffect(() => {
    axios
      .get(ServerHost.apiInfoPrivate(), {
        headers: authHeader(),
      })
      .then(
        (response) => {
          setIsLoaded(true);
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
                    <div>топик {item.publicPostsResponse.topic}</div>
                    <div>
                      <div>
                        {item.publicPostsResponse.photos.length > 0 &&
                          item.publicPostsResponse.photos.map((photo, num) => (
                            <img key={num} src={photo.thumb} />
                          ))}
                      </div>
                      <h4>тема {item.publicPostsResponse.theme}</h4>
                    </div>
                    <div key={index}>{item.publicPostsResponse.text}</div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
