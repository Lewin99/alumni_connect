import { React } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import "./App.css";
import Home from "./components/home.mjs";
import Login from "./components/login.mjs";
import Signup from "./components/signup.mjs";
import AboutUs from "./components/about us.mjs";
import Footer from "./components/footer.mjs";
import LoggedInUser from "./components/loggedInUser.mjs";
import LoggedInHome from "./components/loggedinHome.mjs";
import LoggedInAddEvents from "./components/loggedinAddevents.mjs";
import LoggedInMyEvents from "./components/loggedinMyevents.mjs";
import LoggedInAdimPage from "./components/loggedinAdimpage.mjs";
import Nomatch from "./components/nomatch.mjs";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/loggedinuser" element={<LoggedInUser />}>
          <Route index element={<LoggedInHome />} />
          <Route path="add-events" element={<LoggedInAddEvents />} />
          <Route path="my-events" element={<LoggedInMyEvents />} />
          <Route path="AdminPage" element={<LoggedInAdimPage />} />
        </Route>
        <Route path="*" element={<Nomatch />} />
      </Routes>
      <div className="content">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default App;
