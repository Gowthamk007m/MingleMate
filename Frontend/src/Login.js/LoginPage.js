import React, { useContext, useState } from "react";
import AuthContext from "../Context/AuthContext";
import { Link } from "react-router-dom";

const LoginPage = () => {
  let { loginUser } = useContext(AuthContext);

    const [usernameValue, setUsernameValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");

    const loginWithCredentials = (username, password) => {
      const credentials = {
        username: username,
        password: password,
      };
      loginUser(credentials);
    };

    // Function to update the state variables when a button is clicked
    const handleButtonClick = (newUsername, newPassword) => {
      // Set the values based on the button click action
      setUsernameValue(newUsername);
      setPasswordValue(newPassword);
    };
  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Iniciar sesión - Mi aplicación</title>
      <link
        href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"
        rel="stylesheet"
      />
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-2xl ">
          <div className="flex justify-center mb-8">

            <p className="text-[35px]">𝓝𝓮𝔁𝓾𝓼</p>
            
            {/* <a className="text-[35px]">𝓜𝓲𝓷𝓰𝓵𝓮𝓜𝓪𝓽𝓮</a> */}

          </div>
          <h1 className="text-2xl font-semibold text-center text-gray-500 mt-8 mb-6">
            Sign In
          </h1>
          <p className="text-1 font-semibold  text-gray-700 mt-8 mb-6">
            Try this accounts or{" "}
            <Link to="/register" className="text-cyan-600 underline">
              Create one
            </Link>
            :
          </p>
          <div className="flex flex-wrap">
            <button
              onClick={() => handleButtonClick("Adidas_Official", "admin12345")}
              className="w-32 bg-gradient-to-r from-cyan-400 to-cyan-600 text-black py-2 rounded-lg mx-auto block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 mb-2"
            >
              Adidas
            </button>

            <button
              onClick={() => handleButtonClick("Lionel_Messi", "admin12345")}
              className="w-32 bg-gradient-to-r from-cyan-400 to-cyan-600 text-black py-2 rounded-lg mx-auto block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 mb-2"
            >
              Messi
            </button>

            <button
              onClick={() => handleButtonClick("Jane", "lionelmessi10")}
              className="w-32 bg-gradient-to-r from-cyan-400 to-cyan-600 text-black py-2 rounded-lg mx-auto block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 mb-2"
            >
              Jane
            </button>

            <button
              onClick={() => handleButtonClick("Jim", "admin12345")}
              className="w-32 bg-gradient-to-r from-cyan-400 to-cyan-600 text-black py-2 rounded-lg mx-auto block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 mb-2"
            >
              Jim
            </button>

            <button
              onClick={() => handleButtonClick("Jhon_Wick", "lionelmessi10")}
              className="w-32 bg-gradient-to-r from-cyan-400 to-cyan-600 text-black py-2 rounded-lg mx-auto block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 mb-2"
            >
              Jhon
            </button>
            {/* Add more buttons for different accounts */}

            <button
              onClick={() =>
                handleButtonClick("Dwight_Schrute", "lionelmessi10")
              }
              className="w-32 bg-gradient-to-r from-cyan-400 to-cyan-600 text-black py-2 rounded-lg mx-auto block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 mb-2"
            >
              Dwight
            </button>
          </div>
          <form onSubmit={loginUser}>
            <div className="mb-4">
              <label
                htmlFor="nombre"
                className="block mb-2 text-sm text-gray-600"
              >
                Username
              </label>
              <input
                type="text"
                name="username"
                placeholder="Enter Username"
                required
                value={usernameValue}
                onChange={(e) => setUsernameValue(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block mb-2 text-sm text-gray-600"
              >
                Password
              </label>
              <input
                placeholder="Enter Password"
                type="password"
                name="password"
                required
                value={passwordValue}
                onChange={(e) => setPasswordValue(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-32 bg-gradient-to-r from-cyan-400 to-cyan-600 text-black py-2 rounded-lg mx-auto block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 mb-2"
            >
              Login
            </button>
          </form>
          <div className="text-center">
            <p className="text-sm">
              Don't have an account?
              <Link to="/register" className="text-cyan-600">
                Register
              </Link>
            </p>
          </div>
          <p className="text-xs text-gray-600 text-center mt-8">© Instagram</p>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
