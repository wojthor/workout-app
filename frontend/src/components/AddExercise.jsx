import React, { useEffect } from "react";
import { useState } from "react";
import Modal from "react-modal";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addExercise } from "../features/workout/workoutSlice";
import Spinner from "../components/Spinner";
import { AiOutlineCloseCircle } from "react-icons/ai";
Modal.setAppElement("#root");

function AddExercise({ modalIsOpen, closeModal, workoutId }) {
  const dispatch = useDispatch();

  const { isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
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
      toast.error(message);
    }

    if (isSuccess) {
    }
  }, [isError, isSuccess, message]);

  const onChange = (e) => {
    setExercise((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!name || !sets || !weight || !repetitions) {
      toast.error("Please enter empty fields");
    } else {
      const exerciseData = {
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
    <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add Exercise</h5>
            <button
              type="button"
              className="close"
              onClick={closeModal}
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={name}
                  placeholder="Enter your name"
                  onChange={onChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="sets"
                  name="sets"
                  value={sets}
                  placeholder="Enter a number of sets"
                  onChange={onChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="weight"
                  name="weight"
                  value={weight}
                  placeholder="Enter a number of weight"
                  onChange={onChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="repetitions"
                  name="repetitions"
                  value={repetitions}
                  placeholder="Enter a number of repetitions"
                  onChange={onChange}
                />
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
                <button onClick={closeModal} className="btn btn-secondary ml-2">
                  <AiOutlineCloseCircle />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default AddExercise;
