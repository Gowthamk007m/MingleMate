import React, { useContext, useEffect, useState } from "react";
import { Card } from "flowbite-react";
import AuthContext from "../../Context/AuthContext";
import LoadingAnimation from "../../Animations/LoadingAnimation";
import axios from "axios";
import { Link } from "react-router-dom";

const Notifications = ({ FollowersData, close, status, user, log_user }) => {
  const [notification, setNotifications] = useState(null);



  const { authTokens } = useContext(AuthContext);

  useEffect(() => {
    get_data();
  }, []);


const get_data = async () => {
  try {
    const response = await axios.get(
      "https://minglemate.pythonanywhere.com/Api/notifications/",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.access}`,
        },
      }
    );

    if (response.status === 200) {
      setNotifications(response.data);
      console.log(response.data)
    } else {
      // Handle other status codes or errors as needed
    }
  } catch (error) {
    console.error("Error:", error);
    // Handle the error
  }
};

  return (
    <div className="relative  top-20 p-1 w-full rounded-lg h-[calc(100vh-74px)]  md:left-[5rem] md:w-[89%] md:top-1 lg:left-[17%]  lg:h-full lg:w-[80%] lg:top-1 lg:ml-3 bg-gray-200 lg:p-8">
      {notification ? (
        <Card className="relative flex w-[100%] justify-center top-2 mt-5 sm:relative  sm:w-full overflow-y-scroll  ">
          <div className="mb-4 flex items-center justify-between ">
            <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
              Notifications
            </h5>
            <a className=" font-medium text-green-600 " href="#">
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
                    <Link to={`/profile/${notify.action_user_data.id}`}>
                      <div className="flex items-center space-x-4">
                        <div className="shrink-0">
                          <img
                            alt={notify.user_account.name}
                            className="rounded-full w-10 h-10 lg:w-16 lg:h-16"
                            height="24"
                            src={`https://minglemate.pythonanywhere.com${notify.action_user_data.profile_picture}`}
                            width="24"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className=" text-sm font-medium text-gray-900 dark:text-white">
                            {notify.message}
                          </p>
                          <h5 className="float-right text-sm lg:text-lg">
                            {" "}
                            {notify.created_at_formatted}
                          </h5>
                          <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                            {notify.email}
                          </p>
                        </div>
                        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white"></div>
                      </div>
                    </Link>
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
