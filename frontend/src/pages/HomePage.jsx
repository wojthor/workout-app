import React from "react";
import Spinner from "../components/Spinner";
import { useSelector } from "react-redux";
import Sidebar from "../components/Sidebar";

function HomePage() {
  const { isLoading } = useSelector((state) => state.auth);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <Sidebar>
      <div className=" d-flex ">
        <img src="paris.png" className="rounded mx-auto d-block" alt="paris" />
      </div>
    </Sidebar>
  );
}

export default HomePage;
