import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "../Context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import FollowStatus from "../Follow&Unfollow/FollowStatus";
import Animation from "../Animations/LoadingAnimation";
import { Card } from "flowbite-react";

const Followlist = () => {
  const [userData, setUserData] = useState([]);
  const { authTokens, user } = useContext(AuthContext);
  const profile = user.userprofile;
  const navigate = useNavigate();
  const id = profile.id;
  useEffect(() => {
    fetchData();
  }, []);

  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    // Simulate fetching images and API requests
    // Once the data is fetched and images are loaded, set imagesLoaded to true
    setTimeout(() => {
      setImagesLoaded(true);
    }); // Simulated delay, replace with your actual data fetching logic
  }, []);

  const close = () => {
    navigate("/");
  };

  const fetchData = () => {
    axios
      .get("/Api/follow_suggestion/", {
        headers: {
          Authorization: "Bearer " + String(authTokens.access),
        },
      })
      .then((res) => {
        const data = res.data;
        setUserData(data);
        console.log("This is suggestion data", data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // Custom hook to handle follow/unfollow functionality

  // Filter users who are not being followed by the current user
  const filteredUserData = userData.filter(
    (user) => !user.isFollowing || user.id === profile.id
  );

  return (
    <div className="relative  top-20 p-1 w-full rounded-lg h-[calc(100vh-74px)] lg:left-[17%]  lg:h-full lg:w-[80%] lg:top-1 bg-gray-200 lg:p-8">
      {imagesLoaded ? (
        <Card className="relative flex justify-center top-2 mt-5 sm:relative  sm:w-full right-1 ">
          <div className="mb-4 flex items-center justify-between ">
            <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
              Suggestions
            </h5>
            <a className=" font-medium text-green-600 " href="/">
              <div
                onClick={close}
                type="button"
                className="ml-auto -mx-1.5 -my-1.5 float-right bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                data-dismiss-target="#toast-default"
                aria-label="Close"
              >
                <span className="sr-only">Close</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M 7.1601562 3 L 8.7617188 5 L 18 5 C 18.551 5 19 5.448 19 6 L 19 15 L 16 15 L 20 20 L 24 15 L 21 15 L 21 6 C 21 4.346 19.654 3 18 3 L 7.1601562 3 z M 4 4 L 0 9 L 3 9 L 3 18 C 3 19.654 4.346 21 6 21 L 16.839844 21 L 15.238281 19 L 6 19 C 5.449 19 5 18.552 5 18 L 5 9 L 8 9 L 4 4 z"></path>
                </svg>
              </div>
            </a>
          </div>
          <div className="flow-root">
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredUserData.length > 0
                ? filteredUserData.map((user, index) => (
                    <li key={user.id} className="py-3 sm:py-4">
                      <div className="flex items-center space-x-4">
                        <div className="shrink-0">
                          <img
                            alt={user.name + " image"}
                            className="rounded-full  w-16 h-16"
                            height="24"
                            src={user.profile_picture}
                            width="24"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                            <Link to={`/profile/${user.id}`}>
                              {user.username}
                            </Link>
                          </p>
                          <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                            {user.email}
                          </p>
                        </div>
                        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                          <FollowStatus id={user.id} />
                        </div>
                      </div>
                    </li>
                  ))
                : null}
            </ul>
          </div>
        </Card>
      ) : (
        <Animation.LoadingOval2 />
      )}
    </div>
  );
};

export default Followlist;
