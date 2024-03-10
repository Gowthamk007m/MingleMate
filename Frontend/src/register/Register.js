import React, { useState } from "react";
import axios from "axios";
import styles from "./RegistrationForm.module.css";
import { Link } from "react-router-dom";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });
  const [errorMessages, setErrorMessages] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("https://minglemate.pythonanywhere.com/Api/register/", formData)
      .then((response) => {
        // Handle successful registration (e.g., show success message)
        window.location = "/login/";
      })
      .catch((error) => {
        // Handle registration errors (e.g., display error messages)
        console.error("Registration failed:", error.response.data);
        if (error.response && error.response.data) {
          setErrorMessages(error.response.data);
        } else {
          console.error("Registration failed:", error);
        }
      });
  };

  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link
        href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"
        rel="stylesheet"
      />
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-md px-2 w-full p-6 bg-white rounded-lg shadow-lg">
          <div className="flex justify-center mb-8">
          <a className="text-[35px]">𝓝𝓮𝔁𝓾𝓼</a>

          </div>
          <h1 className="text-2xl font-semibold text-center text-gray-500 mt-8 mb-6">
            Sign Up
          </h1>
          <form onSubmit={handleSubmit}>
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
                value={formData.username}
                onChange={handleChange}
                className={errorMessages.username ? styles.error : ""}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="apellido"
                className="block mb-2 text-sm text-gray-600"
              >
                Email
              </label>
              <input
                type="text"
                placeholder="Enter Email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className={errorMessages.email ? styles.error : ""}
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
                value={formData.password}
                onChange={handleChange}
                required
                className={errorMessages.password ? styles.error : ""}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block mb-2 text-sm text-gray-600"
              >
                Conform password
              </label>
              <input
                placeholder="Re-Enter Password"
                type="password"
                name="password2"
                value={formData.password2}
                onChange={handleChange}
                className={errorMessages.password ? styles.error : ""}
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="confirmPassword"
                className="block mb-2 text-sm text-red-600"
              >
                {errorMessages.password && (
                  <div className={styles.errorMessage}>
                    {errorMessages.password}
                  </div>
                )}
                {errorMessages.email && (
                  <div className={styles.errorMessage}>
                    Email already exists
                  </div>
                )}
                {errorMessages.username && (
                  <div className={styles.errorMessage}>
                    {errorMessages.username}
                  </div>
                )}
              </label>
            </div>

            <button
              type="submit"
              className="w-32 bg-gradient-to-r from-cyan-400 to-cyan-600 text-black py-2 rounded-lg mx-auto block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 mb-2"
            >
              Register
            </button>
          </form>
          <div className="text-center">
            <p className="text-sm">
              Already have an account?
              <Link to="/login" className="text-cyan-600">
                Login
              </Link>
            </p>
          </div>
          <p className="text-xs text-gray-600 text-center mt-8">© Instagram</p>
        </div>
      </div>
    </>
  );
};

export default RegistrationForm;
