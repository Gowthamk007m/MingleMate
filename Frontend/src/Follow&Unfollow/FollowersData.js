"use client";
import "../index.css";
import React from "react";
import { Card } from "flowbite-react";
import FollowStatus from "./FollowStatus";
import { Link } from "react-router-dom";

const CardWithList = ({ FollowersData, close, status, user, log_user }) => {
  console.log("Reaching", FollowersData, status);

  return (
    <>
      {status ? (
        <Card className="relative flex justify-center top-2 mt-5 sm:relative  sm:w-full right-1 ">
          <div className="mb-4 flex items-center justify-between ">
            <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
              Followers
            </h5>
            <a className=" font-medium text-green-600 " href="#">
              <div
                onClick={close}
                type="button"
                className="ml-auto -mx-1.5 -my-1.5 float-right bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                data-dismiss-target="#toast-default"
                aria-label="Close"
              >
                <span className="sr-only">Close</span>
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
              </div>
              <p className="relative bottom-0.5 float-right from-neutral-700">
                Followers of {user.name}
              </p>
            </a>
          </div>
          <div className="flow-root">
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {FollowersData.map((follower) => (
                <li key={follower.user_id_data.id} className="py-3 sm:py-4">
                  <div className="flex items-center space-x-4">
                    <div className="shrink-0">
                      <img
                        alt={follower.name + " image"}
                        className="rounded-full  w-16 h-16"
                        height="24"
                        src={follower.user_id_data.profile_picture}
                        width="24"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                        <Link
                          to={`/profile/${follower.user_id_data.id}`}
                          onClick={close}
                        >
                          {log_user.username ===
                          follower.user_id_data.username ? (
                            <div>You</div>
                          ) : (
                            <a>{follower.user_id_data.username}</a>
                          )}
                        </Link>
                      </p>
                      <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                        {follower.email}
                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                      {log_user.username === follower.user_id_data.username ? (
                        <div></div>
                      ) : (
                        <FollowStatus id={follower.user_id_data.id} />
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      ) : (
        // Following.................

        <Card className="relative flex justify-center top-2 mt-5 sm:relative  sm:w-full right-1 ">
          <div className="mb-4 flex items-center justify-between ">
            <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
              Following
            </h5>
            <a className=" font-medium text-green-600 " href="#">
              <div
                onClick={close}
                type="button"
                className="ml-auto -mx-1.5 -my-1.5 float-right bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                data-dismiss-target="#toast-default"
                aria-label="Close"
              >
                <span className="sr-only">Close</span>
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
              </div>
              <p className="relative bottom-0.5 float-right from-neutral-700">
                Followed by {user.name}
              </p>
            </a>
          </div>
          <div className="flow-root">
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {FollowersData.map((follower) => (
                <li
                  key={follower.following_user_id_data.id}
                  className="py-3 sm:py-4"
                >
                  <div className="flex items-center space-x-4">
                    <div className="shrink-0">
                      <img
                        alt={follower.name + " image"}
                        className="rounded-full  w-16 h-16"
                        height="32"
                        src={follower.following_user_id_data.profile_picture}
                        // Replace with the desired image URL
                        width="32"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                        <Link
                          to={`/profile/${follower.following_user_id_data.id}`}
                          onClick={close}
                        >
                          {log_user.username ===
                          follower.following_user_id_data.username ? (
                            <div>You</div>
                          ) : (
                            <div>
                              {follower.following_user_id_data.username}
                            </div>
                          )}
                        </Link>
                      </p>
                      <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                        {follower.email}
                      </p>
                    </div>

                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                      {log_user.username ===
                      follower.following_user_id_data.username ? (
                        <div></div>
                      ) : (
                        <FollowStatus id={follower.following_user_id_data.id} />
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      )}
    </>
  );
};

export default CardWithList;
