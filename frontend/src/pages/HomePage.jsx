import React from "react";
import Spinner from "../components/Spinner";
import { useSelector } from "react-redux";
import Sidebar from "../components/Sidebar";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import CardExample from "../components/Card";

function HomePage() {
  const { isLoading } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.auth);
  const { workouts } = useSelector((state) => state.workouts);

  if (isLoading) {
    return <Spinner />;
  }

  console.log(workouts);

  if (!user) {
    return (
      <>
        <div className="d-flex flex-row d-flex align-items-center w-100 p-4">
          <div className="d-flex flex-column text-left px-4 w-50 ">
            {" "}
            <h1 className="">Welcome on Workout App</h1>
            <p className="text-left">
              Start your fitness journey today and keep track of your progress
            </p>
            <div className="d-flex flex-row gap-2">
              <Button variant="dark" className="text-left">
                <Link
                  to="/login"
                  className="link-offset-2 link-underline link-underline-opacity-0 link-light "
                >
                  Login
                </Link>
              </Button>
              <Button variant="dark">
                <Link
                  to="/register"
                  className="link-offset-2 link-underline link-underline-opacity-0 link-light "
                >
                  Register
                </Link>
              </Button>
            </div>
          </div>
          <div className="d-flex flex-column text-left py-5 px-4 w-50 ">
            <img
              src="logo.svg"
              className="rounded mx-auto d-block"
              alt="logo"
            />
          </div>
        </div>
        <>
          <Footer />
        </>
      </>
    );
  }

  return (
    <Sidebar>
      <div className="d-flex flex-column px-2 w-100 align-items-center home-page-user gap-2">
        <div className="d-flex  align-items-center">
          <h1>Welcome {user.name} </h1>
        </div>

        <div className=" d-flex flex-row px-2  align-items-center">
          <CardExample workouts={workouts} user={user} />
        </div>

        <div className="d-flex flex-row w-75 gap-3 justify-content-center p-5 ">
          {workouts && workouts.length > 0 ? (
            <>
              <Button variant="link" className="w-100 justify-content-center">
                <Link
                  to="/workouts"
                  className="link-offset-2 link-underline link-underline-opacity-0 link-light "
                >
                  <img
                    src="progress.svg"
                    className="img-fluid w-75"
                    alt="progress"
                  />
                </Link>
              </Button>
            </>
          ) : (
            <Button variant="link" className="w-100 align-items-center">
              <Link
                to="/workouts"
                className="link-offset-2 link-underline link-underline-opacity-0 link-light "
              >
                <img
                  src="add_workout.svg"
                  className="img-fluid w-75"
                  alt="add_workout"
                />
              </Link>
            </Button>
          )}
        </div>
      </div>
    </Sidebar>
  );
}

export default HomePage;
