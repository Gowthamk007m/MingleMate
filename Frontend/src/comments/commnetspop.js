import React from "react";
import { Button } from "flowbite-react";
import { format } from "date-fns";

import axios from "axios";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../Context/AuthContext";

const Commnetspop = ({ comments, onClose, image_id, image, rerend }) => {
  const [allnewcomments, setComments] = useState([]);
  const { authTokens, user } = useContext(AuthContext);
  const [newComment, setNewComment] = useState("");
  const [imageData, setImageData] = useState({});
  const [from_com, setfrom_com] = useState([]);
  const [com_len, setcom_len] = useState("loading");
  const apiEndpoint = `https://minglemate.pythonanywhere.com/Api/comments/${image_id}/`;

  const fetchData = async () => {
    try {
      const response = await axios.get(apiEndpoint, {
        headers: {
          Authorization: "Bearer " + authTokens.access,
        },
      });
      setComments(response.data.comment);
      // console.log("usercomment", response.data.comment);
      setImageData(response.data.images);

      setcom_len(response.data.comment.length);

      // console.log("commnets", response.data.comment);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();

    const apiEndpoint = `https://minglemate.pythonanywhere.com/Api/comments/${image_id}/`;

    const commentData = {
      image_post: image_id,
      content: newComment,
    };

    try {
      await axios.post(apiEndpoint, commentData, {
        headers: {
          Authorization: "Bearer " + authTokens.access,
        },
      });
      setNewComment("");

      const response = await axios.get(
        `https://minglemate.pythonanywhere.com/Api/comments/${image_id}/`
      );
      setComments(response.data.comment);
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };
  const handleDeleteComment = async (commentId) => {
    try {
      const apiEndpoint = `https://minglemate.pythonanywhere.com/Api/comments_delete/${commentId}/`;

      await axios.delete(apiEndpoint, {
        headers: {
          Authorization: "Bearer " + authTokens.access,
        },
      });


      const response = await axios.get(
        `https://minglemate.pythonanywhere.com/Api/comments/${image_id}/`
      );
      setComments(response.data.comment);
      setfrom_com(from_com + 1);
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const handleOutsideClick = (e) => {
    if (e.target.classList.contains("popup-overlay")) {
      onClose();
    }
  };

  useEffect(() => {
    fetchData();
  }, [newComment, from_com]);

  return (
    <div className="popup-overlay" onClick={handleOutsideClick}>
      <div className="popup-content flex flex-col w-[90%] h-4/5 lg:h-[80%]  md:flex-row">
        <div className="relative  border-2 border-grey px-2 w-[100%] max-h-[40%] lg:w-[50%] lg:max-h-full">
          <img
            src={image}
            className="flex  h-full   lg:h-full object-contain w-full align-middle justify-center bg-white  rounded-sm"
          />
        </div>

        <div className="relative flex-col flex-wrap overflow-y-scroll w-[100%]  lg:w-[50%]   ">
          <div className="w-full  flex-col justify-center ">
            <div className="border-2 mb-2 px-2">
              <h2 className=" lg:text-2xl text-lg font-bold text-gray-900 dark:text-white">
                Comments ({com_len})
              </h2>
              <form
                className=" mb-0 max-h-[8rem] lg:max-h-[8rem] "
                onSubmit={handleSubmitComment}
              >
                <div className=" py-0  lg:py-1 px-1 mb-0 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                  <textarea
                    id="comment"
                    rows={1}
                    maxLength={200}
                    minLength={1}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="px-0 w-full max-h-[2rem] min-h-[2rem] text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                    placeholder="Write a comment..."
                    required
                    value={newComment}
                  />
                </div>
                <Button
                  color="light"
                  type="submit"
                  className="mt-1 mb-1 border-blue-500 px-0 py-0 text-sm max-h-[2rem]"
                  onClick={rerend}
                >
                  Post comment
                </Button>
              </form>{" "}
            </div>
          </div>

          <div className="relative w-[100%] border left-0 right-0">
            {allnewcomments.map((comment, index) => (
              <article
                key={comment.id}
                commentindex={index}
                className="p-2 mb-2 text-base break-words bg-white border-b  w-[100%]"
              >
                <footer className=" items-center mb-2">
                  <div className="flex items-center">
                    <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                      <img
                        className="mr-2 w-6 h-6 rounded-full"
                        src={comment.user.profile_picture}
                        alt="Michael Gough"
                        loading="lazy"
                      />
                      <p className="text-cyan-600">{comment.user.name}</p>
                    </div>
                    <p className="text-[12px] text-orange-400 dark:text-gray-400">
                      <time
                        pubdate=""
                        dateTime="2022-02-08"
                        title="February 8th, 2022"
                      >
                        {format(new Date(comment.created_at), "dd/MM/yy ")}
                      </time>
                    </p>
                  </div>
                </footer>
                <p className=" text-black text-sm pl-5 dark:text-gray-400 lg:text-lg">
                  {comment.content}
                </p>

                {comment.user.name === user.username && (
                  <div className="flex items-center mt-4 space-x-4">
                    <button
                      type="button"
                      className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400"
                    >
                      <svg
                        className="mr-1 w-3.5 h-3.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 18"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
                        />
                      </svg>
                      <div onClick={rerend}>
                        <div
                          onClick={() => handleDeleteComment(comment.id)}
                          className="text-blue-600"
                        >
                          Delete
                        </div>
                      </div>
                    </button>
                  </div>
                )}
              </article>
            ))}
          </div>

          {/* </section> */}
        </div>

        {/* <button onClick={onClose}>Close</button> */}
      </div>
    </div>
  );
};

export default Commnetspop;
