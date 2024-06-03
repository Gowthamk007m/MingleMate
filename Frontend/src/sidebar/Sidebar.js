import React, { useContext, useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import styles from "./Sidebar.module.css";
import AuthContext from "../Context/AuthContext";
const Sidebar = ({ profile, activeButton, onButtonClick }) => {
  let { user, logoutUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [activeLink, setActiveLink] = useState("home");
  const userprofile = user.userprofile.id;
  const navigate = useNavigate();

  const handleButtonClick = (button) => {
    setActiveLink(button);

    if (button === "home") {
      navigate("/");
    } else if (button === "search") {
      navigate("/search");
    } else if (button === "create") {
      navigate("/create");
    } else if (button === "suggestion") {
      navigate("/suggestion");
    } else if (button === "notification") {
      navigate("/notification");
    } else if (button === "profile") {
      navigate(`/profile/${userprofile}`);
    } else if (button === "logout") {
      logoutUser();
    }
  };

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setLoading(false);
    }, 100);

    return () => clearTimeout(loadingTimer);
  }, []);
  return (
    <>
      <div className={styles.mainbody}>
        <aside className={styles.sidebar}>
          <header className={styles.sidebar_header}>
            <p  className={styles.logo_img}>
              <p className="text-[25px]">𝓝𝓮𝔁𝓾𝓼</p>
            </p>
            <i
              className={`logo-icon uil uil-instagram ${styles.logo_icon}`}
            ></i>
          </header>
          <nav>
            <button onClick={() => handleButtonClick("home")}>
              <span>
                <i className={`uil uil-estate ${styles.icon}`}>
                  <svg
                    className="w-6 h-6 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8v10a1 1 0 0 0 1 1h4v-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5h4a1 1 0 0 0 1-1V8M1 10l9-9 9 9"
                    />
                  </svg>
                </i>

                <span>
                  {" "}
                  <Link to="/" className={styles.sbutton}>
                    Home
                  </Link>
                </span>
              </span>
            </button>

            <button onClick={() => handleButtonClick("search")}>
              <span>
                <i className={`uil uil-search ${styles.icon}`}>
                  <svg
                    className="w-6 h-6 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </i>
                <span>
                  {" "}
                  <Link to="search" className={styles.sbutton}>
                    Search
                  </Link>
                </span>
              </span>
            </button>

            <button onClick={() => handleButtonClick("suggestion")}>
              <span>
                <i className={`uil uil-compass ${styles.icon}`}>
                  <svg
                    className="w-6 h-6 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M18 5h1v12a2 2 0 0 1-2 2m0 0a2 2 0 0 1-2-2V2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v15a2 2 0 0 0 2 2h14ZM10 4h2m-2 3h2m-8 3h8m-8 3h8m-8 3h8M4 4h3v3H4V4Z"
                    />
                  </svg>
                </i>
                <span>Suggestions</span>
              </span>
            </button>

            <button onClick={() => handleButtonClick("notification")}>
              <span>
                <i className={`uil uil-heart ${styles.icon}`}>
                  <svg
                    className="w-6 h-6 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 21"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 3.464V1.1m0 2.365a5.338 5.338 0 0 1 5.133 5.368v1.8c0 2.386 1.867 2.982 1.867 4.175C17 15.4 17 16 16.462 16H3.538C3 16 3 15.4 3 14.807c0-1.193 1.867-1.789 1.867-4.175v-1.8A5.338 5.338 0 0 1 10 3.464ZM4 3 3 2M2 7H1m15-4 1-1m1 5h1M6.54 16a3.48 3.48 0 0 0 6.92 0H6.54Z"
                    />
                  </svg>
                  <span class="absolute -top-2 left-4 rounded-full bg-red-500 p-0.5 px-2 text-sm text-red-50">
                    {profile.notification_count}
                  </span>
                </i>
                <span>Notifications</span>
              </span>
            </button>

            <button onClick={() => handleButtonClick("create")}>
              <span>
                <i className={`uil uil-plus-circle ${styles.icon}`}>
                  <svg
                    className="w-6 h-6 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 5.757v8.486M5.757 10h8.486M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>{" "}
                </i>
                <span>
                  <Link to="create" className={styles.sbutton}>
                    Create
                  </Link>
                </span>
              </span>
            </button>

            <button onClick={() => handleButtonClick("profile")}>
              <span>
                <i className={`uil uil-plus-circle ${styles.icon}`}>
                  <svg
                    className="w-6 h-6 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 18"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 8a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm-2 3h4a4 4 0 0 1 4 4v2H1v-2a4 4 0 0 1 4-4Z"
                    />
                  </svg>
                </i>
                <span>
                  <Link
                    to={`/profile/${userprofile}`}
                    className={styles.sbutton}
                  >
                    Profile
                  </Link>
                </span>
              </span>
            </button>

            <button onClick={() => handleButtonClick("logout")}>
              <span>
                <i
                  className={`fa fa-sign-out ${styles.icon}`}
                  style={{ fontSize: "24px" }} // Corrected "fontsize" to "fontSize"
                ></i>
                <span>
                  {user ? (
                    <div onClick={logoutUser}>Logout</div>
                  ) : (
                    <Link to="/login">Login</Link>
                  )}
                </span>
              </span>
            </button>
          </nav>
        </aside>
      </div>

      <Outlet />
    </>
  );
};

export default Sidebar;
