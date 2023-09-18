import React from "react";
import Sidebar from "../components/Sidebar";
import { useSelector } from "react-redux";

function HomePage() {
  const { user } = useSelector((state) => state.auth);
  return (
    <>
      <Sidebar />

      <div class="jumbotron text-center">
        <a className="profile">{user && user.name}</a>
        <h1>Workout App</h1>
        <p>Wyobraź sobie że twojej starej się chce iść do pracy...</p>
      </div>
      <div className="img-responsive">
        <img src="paris.png" alt="paris" />
      </div>
    </>
  );
}

export default HomePage;
