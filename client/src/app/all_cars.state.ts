import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICar } from "../typings/car";

interface AllCarsState {
  cars: ICar[];
  loading: boolean;
  error: string | null;
}

const initialState: AllCarsState = {
  cars: [],
  loading: false,
  error: null,
};

const allCarsSlice = createSlice({
  name: "allCars",
  initialState,
  reducers: {
    fetchAllCarsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchAllCarsSuccess(state, action: PayloadAction<ICar[]>) {
      state.cars = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchAllCarsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchAllCarsStart,
  fetchAllCarsSuccess,
  fetchAllCarsFailure,
} = allCarsSlice.actions;

export default allCarsSlice.reducer;
