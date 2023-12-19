import React from "react";
import { addExercise, reset } from "../features/workout/workoutSlice";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Spinner from "../components/Spinner";

function AddExerciseModal({ workoutDate, workoutId }) {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.workouts
  );

  const [exercise, setExercise] = useState({
    name: "",
    sets: "",
    weight: "",
    repetitions: "",
  });

  const { name, sets, weight, repetitions } = exercise;

  const onChange = (e) => {
    setExercise((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!name || !sets || !weight || !repetitions) {
      console.log("Please enter empty fields");
    } else {
      const exerciseData = {
        workoutId: workoutId,
        date: workoutDate,
        name,
        sets,
        weight,
        repetitions,
      };
      console.log(exerciseData);
      dispatch(addExercise(exerciseData));
    }
  };

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (isSuccess) {
      dispatch(reset());
    }
  }, [isError, isSuccess, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Button
        variant="primary"
        onClick={(e) => {
          e.stopPropagation();
          handleShow();
        }}
      >
        Add exercise
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add exercise</Modal.Title>
        </Modal.Header>
        <Modal.Body key={workoutDate}>
          <p>Date: {workoutDate}</p>
          <p>WorkoutID: {workoutId}</p>

          <Form
            onSubmit={onSubmit}
            className="d-flex flex-column d-flex align-items-center gap-2 w-100"
          >
            <Form.Group className="w-100">
              <Form.Control
                type="text"
                name="name"
                value={name}
                placeholder="Enter exercise name"
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group className="w-100">
              <Form.Control
                type="number"
                name="sets"
                value={sets}
                placeholder="Enter a number of sets"
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group className="w-100">
              <Form.Control
                type="number"
                name="weight"
                value={weight}
                placeholder="Enter a number of weight"
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group className="w-100">
              <Form.Control
                type="number"
                name="repetitions"
                value={repetitions}
                placeholder="Enter a number of repetitions"
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group className="w-100">
              <Button variant="secondary" type="submit">
                Submit
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AddExerciseModal;
