import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function withAuthentication(WrappedComponent) {
  return function (props) {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
      const verifyAuthentication = async () => {
        try {
          const response = await fetch("/api/users/verifyauth");
          if (response.ok) {
            const data = await response.json();
            console.log("isauth", data);
            setIsAuthenticated(data.isAuthenticated);
          }
        } catch (error) {
          console.error("Error verifying authentication:", error);
          setIsAuthenticated(false); // Set isAuthenticated to false if there's an error
        }
      };

      verifyAuthentication();
    }, []);

    if (!isAuthenticated) {
      navigate("/login"); // Redirect to the login page when not authenticated
      return null; // Return null to prevent rendering the component
    }

    return <WrappedComponent {...props} />;
  };
}
