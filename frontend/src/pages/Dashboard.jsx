import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/Spinner";
import WorkoutForm from "../components/WorkoutForm";
import { useNavigate } from "react-router-dom";
import { getWorkout, reset } from "../features/workout/workoutSlice";
import List from "../components/List";
import Sidebar from "../components/Sidebar";

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
    <Sidebar>
      <div className="d-flex flex-column p-2 w-75 ">
        <WorkoutForm />

        <div className="d-flex flex-column ">
          <List workouts={workouts} />
        </div>
      </div>
    </Sidebar>
  );
}

export default Dashboard;
