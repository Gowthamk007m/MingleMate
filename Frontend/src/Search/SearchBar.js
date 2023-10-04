import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../Context/AuthContext";
import { Link, useLocation } from "react-router-dom";
import UserFollowers from "../SuggestionBox/UserFollowers";
import FollowStatus from "../Follow&Unfollow/FollowStatus";

const SearchBar = () => {
  const [searchText, setSearchText] = useState(
    localStorage.getItem("searchText") || ""
  );
  const [usernames, setUsernames] = useState([]);
  const { authTokens, user } = useContext(AuthContext);
  const location = useLocation();

  const data = <UserFollowers />;
  useEffect(() => {
    fetch("/Api/user-accounts/", {
      headers: {
        Authorization: "Bearer " + String(authTokens.access),
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch usernames");
        }
        return response.json();
      })
      .then((data) => {
        setUsernames(data); // Since data is an array of user account objects
        console.log("Usernames:", data);
      })
      .catch((error) => {
        console.error("Error fetching usernames:", error);
        // Handle the error (show a message, etc.)
      });
  }, [authTokens.access]);

  const handleSearchChange = (e) => {
    const newSearchText = e.target.value;
    setSearchText(newSearchText);

    // Save the search bar value to localStorage
    localStorage.setItem("searchText", newSearchText);
  };

  const filteredUsernames = usernames.filter((username) =>
    username.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <>
      {/* component */}
      <div className="fixed top-[12%]  left-0 lg:left-[16%] overflow-hidden w-full lg:w-[80%] h-full lg:top-[2%] z-40 select-none">
        <div className="w-full max-h-full lg:w-4/6 lg:max-h-full z-50 relative mx-auto  border rounded-2xl p-2 ">
          <div className="bg-white w-full h-16 rounded-xl mb-3 shadow-lg p-2">
            <input
              type="text"
              placeholder="Search Here..."
              value={searchText}
              onChange={handleSearchChange}
              className="w-full h-full text-2xl rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="bg-white min-h-[28rem] border-b-1 w-full lg:max-h-[44rem] lg: rounded-xl shadow-xl  overflow-y-scroll  p-1">
            {/* items */}

            {searchText && filteredUsernames.length > 0
              ? filteredUsernames.map((username, index) => (
                  <div className="w-full flex p-3 pl-4 items-center  hover:bg-gray-300 rounded-lg cursor-pointer">
                    <div className="mr-4 ">
                      <div className="h-9 w-9 rounded-sm lg:h-14 lg:w-14  flex  items-center justify-center text-3xl">
                        <img
                          className="rounded-full object-cover h-9 w-9 lg:w-14 lg:h-14"
                          src={username.profile_picture}
                          alt={username.name}
                        />
                      </div>
                    </div>

                    <Link
                      to={{
                        pathname: `/profile/${username.id}`,
                        state: { prevLocation: location },
                      }}
                      key={index}
                    >
                      <div>
                        <div className="font-bold text-lg">{username.name}</div>
                        <div className="text-xs text-gray-500">
                          <span className="mr-2"> {username.email}</span>
                        </div>
                      </div>{" "}
                    </Link>

                    <div className="flex-grow"></div>
                    {/* This will push the next div to the right */}
                    <div className="hover:text-green-600 text-md">
                      <FollowStatus id={username.id} />
                    </div>
                  </div>
                ))
              : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchBar;
