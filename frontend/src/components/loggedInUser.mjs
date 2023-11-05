import React, { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import "./Styles/logedinuser.css";
import LoggedInHeader from "./loggedheader.mjs";

function LoggedInUser() {
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    fetch("/api/users/userrole", {
      method: "POST",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.role);
        if (data.role) {
          setUserRole(data.role);
        }
      })
      .catch((error) => {
        console.error("Error fetching user role:", error);
      });
  }, []);

  return (
    <div>
      <LoggedInHeader />
      <nav className="navbar container-fluid min-nav navbar-expand">
        <div className="container-fluid p-4 d-flex">
          <div className="none">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/loggedinuser" className="nav-link text-light">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="add-events" className="nav-link text-light">
                  Add Events
                </Link>
              </li>
              <li className="nav-item">
                <Link to="my-events" className="nav-link text-light">
                  Manage Events
                </Link>
              </li>
              {userRole === "alumini manager" && (
                <li className="nav-item">
                  <Link to="AdminPage" className="nav-link text-light">
                    Admin page
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />
    </div>
  );
}

export default LoggedInUser;
