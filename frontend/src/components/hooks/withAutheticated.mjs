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
          setIsAuthenticated(false);
        }
      };

      verifyAuthentication();
    }, []);

    if (!isAuthenticated) {
      navigate("/login");
      return null;
    }

    return <WrappedComponent {...props} />;
  };
}
