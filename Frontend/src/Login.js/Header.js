import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../Context/AuthContext";

const Header = () => {
  let { user, logoutUser } = useContext(AuthContext);
  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "0px" }}
    >
      <p
        style={{
          paddingRight: "20px",
          paddingLeft: "20px",
          background: "black",
          color: "white",
          fontSize: "20px",
          margin: "10px",
        }}
      >
        {" "}
        <Link to="/register" style={{ color: "white" }}>
          Register
        </Link>{" "}
      </p>
      {user ? (
        <p
          style={{
            paddingRight: "20px",
            paddingLeft: "20px",
            background: "black",
            color: "white",
            fontSize: "20px",
            margin: "10px",
          }}
          onClick={logoutUser}
        >
          Logout
        </p>
      ) : (
        <p
          style={{
            paddingRight: "20px",
            paddingLeft: "20px",
            background: "black",
            color: "white",
            fontSize: "20px",
            margin: "10px",
          }}
        >
          <Link style={{ color: "white" }} to="/login">
            Login
          </Link>
        </p>
      )}
    </div>
  );
};

export default Header;
