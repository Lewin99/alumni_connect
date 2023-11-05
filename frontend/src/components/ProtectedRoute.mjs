import React, { useEffect, useState } from "react";
import { Route, Navigate } from "react-router-dom";

function ProtectedRoute({ element, ...rest }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function verifyAuth() {
      try {
        const response = await fetch("/api/users/verifyauth", {
          method: "POST",
        });

        if (response.status === 200) {
          console.log("response", response.status);
          setIsAuthenticated(true);
        } else {
          console.log("response", response.status);
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Error checking authentication status:", error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    }

    verifyAuth();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? (
    <Route {...rest} element={element} />
  ) : (
    <Navigate to="/login" state={{ from: rest.location }} />
  );
}

export default ProtectedRoute;
