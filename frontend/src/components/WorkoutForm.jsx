import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createWorkout } from "../features/workout/workoutSlice";

function WorkoutForm() {
  const dispatch = useDispatch();
  const [text, setText] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user._id;

    const workoutData = {
      date: text,
      user: userId,
    };

    dispatch(createWorkout(workoutData));
    setText("");
  };

  return (
    <div className="workout-container">
      <section className="add-workout">
        <form onSubmit={onSubmit} className="workout-form">
          <div className="label-container">
            <label htmlFor="text">Workout Date</label>
          </div>
          <div className="input-date-container">
            <input
              type="date"
              className="form"
              name="date"
              id="text"
              value={text}
              placeholder="Please add a date"
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          <div className="button-container">
            <button className="btn btn-danger" type="submit">
              Add Workout
            </button>
          </div>
        </form>
      </section>
      <div className="workout-list">{/* Treningi zostaną dodane tutaj. */}</div>
    </div>
  );
}

export default WorkoutForm;
