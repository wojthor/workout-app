import React, { useEffect } from "react";
import { useState } from "react";
import { Modal, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addExercise } from "../features/workout/workoutSlice";
import Spinner from "../components/Spinner";
import Button from "react-bootstrap/Button";

function AddExercise({ workoutId, workoutDate, show, handleClose }) {
  const dispatch = useDispatch();

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

  useEffect(() => {
    if (isError) {
      console.log("SIEMA");
    }
    if (isSuccess) {
      console.log("Success, closing modal");
      handleClose();
    }
  }, [isError, isSuccess, handleClose, message]);

  const onChange = (e) => {
    setExercise((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting exercise for workout", workoutId);
    if (!name || !sets || !weight || !repetitions) {
      toast.error("Please enter empty fields");
    } else {
      const exerciseData = {
        date: workoutDate,
        workoutId: workoutId,
        name,
        sets,
        weight,
        repetitions,
      };
      dispatch(addExercise(exerciseData));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Modal show={show} onHide={handleClose(workoutId)}>
        {console.log(
          "Modal is",
          show ? "open" : "closed",
          "for workout",
          workoutId
        )}
        <Modal.Header closeButton>
          <Modal.Title>Add Exercise</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={onSubmit}>
            <Form.Group>
              <Form.Control
                type="text"
                name="name"
                value={name}
                placeholder="Enter exercise name"
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="number"
                name="sets"
                value={sets}
                placeholder="Enter a number of sets"
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="number"
                name="weight"
                value={weight}
                placeholder="Enter a number of weight"
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="number"
                name="repetitions"
                value={repetitions}
                placeholder="Enter a number of repetitions"
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group>
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

export default AddExercise;
