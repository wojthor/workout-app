import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import workoutService from "./workoutService";

const initialState = {
  workouts: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  messege: "",
};

//Create new workout
export const createWorkout = createAsyncThunk(
  "/workouts/create",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await workoutService.createWorkout(data, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Get workout
export const getWorkout = createAsyncThunk(
  "/workouts/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await workoutService.getWorkout(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Add exercise
export const addExercise = createAsyncThunk(
  "/workouts/add",
  async (exerciseData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await workoutService.addExercise(exerciseData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Delete workout

export const deleteWorkout = createAsyncThunk(
  "workouts/delete",
  async (workoutId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await workoutService.deleteWorkout(workoutId, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const workoutSlice = createSlice({
  name: "workout",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createWorkout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createWorkout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;

        state.workouts.push(action.payload);
      })
      .addCase(createWorkout.rejected, (state, action) => {
        state.isLoading = false;

        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getWorkout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getWorkout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.workouts = action.payload;
      })
      .addCase(getWorkout.rejected, (state, action) => {
        state.isLoading = false;

        state.isError = true;
        state.message = action.payload;
      })
      .addCase(addExercise.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addExercise.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;

        const index = state.workouts.findIndex(
          (workout) => workout._id === action.payload._id
        );
        if (index !== -1) {
          state.workouts[index] = action.payload;
        } else {
          state.workouts.push(action.payload);
        }
      })
      .addCase(addExercise.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteWorkout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteWorkout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.workouts = state.workouts.filter(
          (workout) => workout._id !== action.payload.id
        );
      })
      .addCase(deleteWorkout.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = workoutSlice.actions;

export default workoutSlice.reducer;
