import React, { Suspense, useEffect, useState } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import Profilename from "../FeedFunctions/Profilename";
import LikeButton from "../FeedFunctions/LikeButton";
import Commnetspop from "../comments/commnetspop";
import FollowStatus from "../Follow&Unfollow/FollowStatus";
import ReactDOM from "react-dom";

const LazyImage = React.lazy(() => import("./LazyImage"));

const RightData = ({
  userAccount,
  image_id,
  image,
  likeCount,
  caption,
  profile,
  comments,
  rerender
}) => {
  const userId = userAccount;
  const [showAllComments, setShowAllComments] = useState(false);

  const [From_pro, setFrom_pro] = useState(true);

  const com_exist = comments.le;

  const isCurrentUser = profile.id === userId.id;
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const scrollPosition = localStorage.getItem("scrollPosition");
    if (scrollPosition) {
      window.scrollTo(0, parseInt(scrollPosition));
      localStorage.removeItem("scrollPosition");
    }
  }, []);

  const handleBack = () => {
    localStorage.setItem("scrollPosition", window.scrollY.toString());
  };

  const renderRandomComment = () => {
    const randomIndex = Math.floor(Math.random() * comments.length);
    const randomComment = comments[randomIndex];

    if (randomComment && randomComment.content) {
      return (
        <div key={randomIndex} className="mb-2 text-sm">
          <span className="font-medium mr-2">{randomComment.user.name}</span>
          {randomComment.content}
        </div>
      );
    } else {
      // Handle the case where the random comment or its content is undefined
      return null; // or return a placeholder message
    }
  };

  useEffect(() => {
    renderRandomComment()
  },[rerender])
  return (
    <div className=" rounded overflow-hidden mt-2  border w-full lg:w-6/12 md:w-6/12 bg-white mx-0 md:mx-0 lg:mx-0">
      <div className="w-full flex justify-between p-3">
        <div className="flex ">
          <div className="rounded-full h-10 w-10  bg-gray-500 flex items-center justify-center overflow-hidden ">
            <img
              className="object-cover h-full w-full"
              src={userAccount.profile_picture}
              alt="profilepic"
            />
          </div>
          <span className="pt-1 ml-2 font-bold text-md mt-1  text-cyan-600">
            <Link to={`/profile/${userId.id}`} onClick={handleBack}>
              <Profilename key={userAccount.user} profile={userAccount} />
            </Link>
          </span>
        </div>

        <span className="px-2 hover:cursor-pointer rounded relative ">
          <>
            <button
              id="dropdownMenuIconHorizontalButton"
              data-dropdown-toggle="dropdownDotsHorizontal"
              className="inline-flex  justify-end items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              type="button"
              onClick={toggleDropdown}
              key={userAccount.user}
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 16 3"
              >
                <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
              </svg>
            </button>
            {/* Dropdown menu */}
            <div
              id="dropdownDotsHorizontal"
              className={`${
                isDropdownOpen ? "absolute" : "hidden"
              } flex-col right-[-24%]  bg-white  divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600`}
            >
              <ul
                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownMenuIconHorizontalButton"
              >
                <li>
                  <div
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    {!isCurrentUser ? (
                      <FollowStatus id={userAccount.id} />
                    ) : (
                      <div>You</div>
                    )}
                  </div>
                </li>
                <li>
                  <div
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    <Link to={`/profile/${userId.id}`} onClick={handleBack}>
                      Profile
                    </Link>
                  </div>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Message
                  </a>
                </li>
              </ul>
              <div className="py-2">
                <div className="block px-4 py-2 text-sm text-red-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                  Report
                </div>
              </div>
            </div>
          </>
        </span>
      </div>

      <LazyImage src={image} />

      <div className="px-3 pb-2">
        <div className="pt-2">
          <div className=" flex  w-24  align-middle">
            <LikeButton
              image_id={image_id}
              profile={profile}
              likeCount={likeCount}
              from_pro={From_pro}
            />

            {showAllComments ? (
              <div className="mb-2 text-sm">
                <Commnetspop
                  comments={comments}
                  image_id={image_id.id}
                  image={image}
                  onClose={() => setShowAllComments(false)}
                  rerend={rerender}
                />
              </div>
            ) : (
              <div
                className="cursor-pointer"
                onClick={() => setShowAllComments(!showAllComments)}
              >
                <svg
                  className="material-icons md-36 black"
                  xmlns="http://www.w3.org/2000/svg"
                  height="34"
                  viewBox="0 0 24 24"
                  width="34"
                >
                  <path d="M0 0h24v24H0V0z" fill="none" />
                  <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z" />
                </svg>
              </div>
            )}
          </div>
        </div>
        <div className="pt-1">
          <div className="mb-2 text-sm">
            <span className="font-medium mr-2">{userAccount.name}</span>{" "}
            {caption}
          </div>
        </div>
        <div className="text-sm mb-2 text-gray-400 cursor-pointer font-medium">
          <span
            className="text-blue-600 hover:underline cursor-pointer"
            onClick={() => setShowAllComments(!showAllComments)}
          >
            View all comments ({comments.length})
          </span>
        </div>
        <div className="">
          {showAllComments
            ? comments.map((comment, commentIndex) => (
                <div key={commentIndex} className="mb-2 text-sm">
                  <Commnetspop
                    comments={comments}
                    image_id={image_id.id}
                    image={image}
                    onClose={() => setShowAllComments(false)}
                    rerend={rerender}
                  />
                  {comment.content}
                </div>
              ))
            : renderRandomComment()}
          {showAllComments &&
            ReactDOM.createPortal(
              <Commnetspop
                comments={comments}
                image_id={image_id.id}
                image={image}
                onClose={() => setShowAllComments(false)}
                 rerend={rerender}
              />,
              document.body
            )}
        </div>
      </div>
    </div>
  );
};

export default RightData;
