import axios from "axios";

const API_URL = "/api/workout/";

const createWorkout = async (workoutData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, workoutData, config);
  return response.data;
};

const getWorkout = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);
  return response.data;
};

const addExercise = async (exerciseData, token) => {
  const { workoutId, ...rest } = exerciseData;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    `${API_URL}${workoutId}`, // Tutaj dołączasz workoutId do URL
    rest, // Przekazujesz resztę danych (czyli dane ćwiczenia bez workoutId)
    config
  );

  return response.data;
};

//Delete user workout
const deleteWorkout = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(API_URL + id, config);
  return response.data;
};

const workoutService = {
  createWorkout,
  getWorkout,
  addExercise,
  deleteWorkout,
};

export default workoutService;
