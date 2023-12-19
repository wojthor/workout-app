import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createWorkout } from "../features/workout/workoutSlice";
import { Form, Button, Figure } from "react-bootstrap";

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
    <Figure>
      <Form className="d-flex flex-row w-100 gap-3" onSubmit={onSubmit}>
        <Form.Group className="w-75 ">
          <Form.Control
            type="date"
            name="date"
            id="text"
            value={text}
            placeholder="Please add a date"
            onChange={(e) => setText(e.target.value)}
          />
        </Form.Group>
        <Button className=" w-25" variant="dark" type="submit">
          Add Workout
        </Button>
      </Form>
    </Figure>
  );
}

export default WorkoutForm;
