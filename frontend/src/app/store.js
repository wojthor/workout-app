import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import workoutReducer from "../features/workout/workoutSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    workouts: workoutReducer,
  },
});
