import axios from "axios";

const API_URL = "http://localhost:8000/api/workouts/";

const createWorkout = async (workoutData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  console.log("Wysyłanie żądania do:", API_URL);
  console.log("Dane wysyłane:", workoutData);
  console.log("Konfiguracja:", config);

  const response = await axios.post(API_URL, workoutData, config);
  console.log("Odpowiedź z serwera:", response);
  return response.data;
};

const getWorkout = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  console.log("Wysyłanie żądania do:", API_URL);

  console.log("Konfiguracja:", config);

  const response = await axios.get(API_URL, config);
  console.log("Odpowiedź z serwera:", response);
  return response.data;
};

const addExercise = async (exerciseData, token) => {
  const { workoutId, date, name, sets, weight, repetitions } = exerciseData;
  const config = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ date, name, sets, weight, repetitions }),
  };

  try {
    const response = await fetch(`${API_URL}${workoutId}`, config);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
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
