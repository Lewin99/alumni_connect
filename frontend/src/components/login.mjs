import { React, useState } from "react";
import "./Styles/loginSignup.css";
import { useNavigate } from "react-router-dom";
import Header from "./header.mjs";

function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loginError, setLoginError] = useState(null);

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Email:", email);
    console.log("Password:", password);

    try {
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const statusCode = response.status;

      const responseData = await response.json();

      if (statusCode === 200) {
        navigate("/loggedinuser");
        setEmail("");
        setPassword("");
      } else {
        alert("invalid credentials");
        console.log("Login failed:", responseData.error);
        setLoginError(responseData.error);
      }
    } catch (error) {
      console.error("An error occurred during the fetch:", error);
    }
  };

  return (
    <div>
      <Header />
      <div className="FormWrapper">
        <div className="Form">
          <div className="LoginIcon">
            <h1 className="text-light">Login</h1>
          </div>

          <div className="loginfailed">
            <h3></h3>
          </div>
          <div className="FormElement">
            <form className="formy">
              <div className="form-group">
                <label>Email:</label>
                <input
                  className="form-control"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{ width: "100%" }}
                />
              </div>

              <div className="form-group">
                <label>Password:</label>
                <input
                  className="form-control"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="SubmitButton">
                <div className="p-1 ">
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="btn mt-2 btn-dark"
                  >
                    Login
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
