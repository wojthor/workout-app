import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/Spinner";

import WorkoutForm from "../components/WorkoutForm";
import Sidebar from "../components/Sidebar";
import WorkoutDisplay from "../components/WorkoutDisplay";
import { useNavigate } from "react-router-dom";
import { getWorkout, reset } from "../features/workout/workoutSlice";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { workouts, isLoading } = useSelector((state) => state.workouts);

  useEffect(() => {
    if (!user) {
      navigate("/");
    } else {
      dispatch(getWorkout());
    }

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Sidebar />

      <section className="jumbotron text-center">
        <h1>Welcome {user && user.name}</h1>
        <p>Lets go workout</p>
      </section>

      <WorkoutForm />
      <section className="table table-hover">
        {workouts && workouts.length > 0 ? (
          <div className="workout">
            {workouts.map((workout) => (
              <WorkoutDisplay key={workout._id} workout={workout} />
            ))}
          </div>
        ) : (
          <h3 className="list">You have not set any workouts</h3>
        )}
      </section>
    </>
  );
}

export default Dashboard;
