import { createContext, useState, useEffect } from "react";
import jsw_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  let [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  let [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jsw_decode(localStorage.getItem("authTokens"))
      : null
  );

  let [loading, setLoading] = useState(true);

  const history = useNavigate();

  let loginUser = async (e) => {
    e.preventDefault();
    let response = await fetch("/Api/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: e.target.username.value,
        password: e.target.password.value,
      }),
    });

    if (response.status === 200) {
      let data = await response.json();
      setAuthTokens(data);
      setUser(jsw_decode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
      history("/");
    } else {
      alert("Something Went Wrong!");
    }
  };

  let logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    history("/login");
  };

  let updateToken = async () => {
    try {
      if (loading) {
        setLoading(false);
      }
      let response = await fetch("/Api/token/refresh/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refresh: authTokens?.refresh,
        }),
      });
      let data = await response.json();

      if (response.status === 200) {
        setAuthTokens(data);
        setUser(jsw_decode(data.access));
        localStorage.setItem("authTokens", JSON.stringify(data));
      } else {
        logoutUser();
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
      logoutUser();
    }
  };

  useEffect(() => {
    if (loading) {
      updateToken();
    }
    let fourMinutes = 1000 * 60 * 4;

    let interval = setInterval(() => {
      if (authTokens) {
        updateToken().catch((error) => {
          // Handle any errors that occurred during the updateToken
          console.error("Error updating token:", error);
        });
      }
    }, fourMinutes);

    return () => clearInterval(interval);
  }, [authTokens, loading]);

  let contextData = {
    user: user,
    loginUser: loginUser,
    logoutUser: logoutUser,
    authTokens: authTokens,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
