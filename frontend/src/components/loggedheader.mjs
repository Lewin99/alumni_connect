import React from "react";
import "./Styles/header.css";
import { Link } from "react-router-dom";

function LoggedInHeader() {
  const logout = async () => {
    try {
      const response = await fetch("/api/users/logout", {
        method: "POST",
      });

      if (response.status === 200) {
        console.log("Logout successful");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div>
      <div className="HeaderBackColor p-3">
        <div className="container-fluid d-flex p-1 navbar navbar-expand navbar-light">
          <div>
            <img
              src="https://i.ibb.co/kmP8qcf/aluLogo.png"
              alt="aluLogo"
              border="0"
            />
          </div>
          <div className="collapse navbar-collapse justify-content-end">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link to="/" className="nav-link text-light" onClick={logout}>
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoggedInHeader;
