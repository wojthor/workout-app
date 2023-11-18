import React from "react";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import { deleteWorkout, getWorkout } from "../features/workout/workoutSlice";

import { useDispatch, useSelector } from "react-redux";
import { CgCloseO } from "react-icons/cg";

import Spinner from "../components/Spinner";

import AddExerciseModal from "./AddExerciseModal";
import ExerciseModal from "./ExerciseModal";

function List({ workouts }) {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.workouts);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="d-flex flex-column">
        {workouts && workouts.length > 0 ? (
          <Accordion defaultActiveKey="1" alwaysOpen>
            {workouts.map((workout, idx) => (
              <React.Fragment key={workout._id}>
                <Accordion.Item eventKey={String(idx)}>
                  <Accordion.Header className="z-n1">
                    <div className="w-100 d-flex justify-content-between gap-3">
                      <h5>{workout.date}</h5>
                      <div className="z-999">
                        <AddExerciseModal
                          workoutDate={workout.date}
                          workoutId={workout._id}
                        />
                        <Button
                          variant="danger"
                          onClick={() => {
                            dispatch(deleteWorkout(workout._id)).then(() => {
                              dispatch(getWorkout());
                            });
                          }}
                        >
                          <CgCloseO />
                        </Button>
                      </div>
                    </div>
                  </Accordion.Header>
                  <Accordion.Body className="d-flex gap-2">
                    {workout.exercises && workout.exercises.length > 0
                      ? workout.exercises.map((exercise, index) => (
                          <div key={exercise._id} className="exercise-info">
                            <ExerciseModal
                              exercise={exercise}
                              date={workout.date}
                            />
                          </div>
                        ))
                      : "You have not added any exercises."}
                  </Accordion.Body>
                </Accordion.Item>
              </React.Fragment>
            ))}
          </Accordion>
        ) : (
          <h3>You have not set any workouts</h3>
        )}
      </div>
    </>
  );
}

export default List;

/*
<AddExercise
                  workoutId={workout._id}
                  workoutDate={workout.date}
                  show={showModals[workout._id] || false}
                  handleClose={handleClose}
                /> */
