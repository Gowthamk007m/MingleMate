import React, { useContext, useEffect, useState } from "react";
import { Card } from "flowbite-react";
import AuthContext from "../../Context/AuthContext";
import LoadingAnimation from "../../Animations/LoadingAnimation";

const Notifications = ({ FollowersData, close, status, user, log_user }) => {
  const [notification, setNotifications] = useState(null);

  const { authTokens } = useContext(AuthContext);

  useEffect(() => {
    get_data();
  }, []);

  const get_data = async () => {
    let response = await fetch("/Api/notifications", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
    });

    let data = await response.json();
    console.log("data", data);
    if (response.status === 200) {
      setNotifications(data);
    } else {
      console.log("error");
    }
  };

  return (
    <div className="relative  top-20 p-1 w-full rounded-lg h-[calc(100vh-74px)] lg:left-[17%]  lg:h-full lg:w-[80%] lg:top-1 bg-gray-200 lg:p-8">
      {notification ? (
        <Card className="relative flex w-[100%] justify-center top-2 mt-5 sm:relative  sm:w-full overflow-y-scroll  ">
          <div className="mb-4 flex items-center justify-between ">
            <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
              Notifications
            </h5>
            <a className=" font-medium text-green-600 " href="#">
              <div
                // onClick={close}
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
              <p className="relative bottom-0.5 float-right from-neutral-700"></p>
            </a>
          </div>
          <div className="flow-root">
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {notification.length === 0 ? (
                <li className="py-3 sm:py-4 text-center text-gray-500 dark:text-gray-400">
                  No notifications available.
                </li>
              ) : (
                notification.map((notify, index) => (
                  <li key={index} className="py-3 sm:py-4">
                    <div className="flex items-center space-x-4">
                      <div className="shrink-0">
                        <img
                          alt={notify.user_account.name}
                          className="rounded-full  w-16 h-16"
                          height="24"
                          src={notify.action_user_data.profile_picture}
                          width="24"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className=" text-sm font-medium text-gray-900 dark:text-white">
                          {notify.message}
                        </p>
                        <h5 className="float-right">
                          {" "}
                          {notify.created_at_formatted}
                        </h5>
                        <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                          {notify.email}
                        </p>
                      </div>
                      <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                      </div>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>
        </Card>
      ) : (
        <div>
          <LoadingAnimation.LoadingOval2 />
        </div>
      )}
    </div>
  );
};

export default Notifications;
