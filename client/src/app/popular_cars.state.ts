import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICar } from "../typings/car";

interface PopularCarsState {
  popularCars: ICar[];
  loading: boolean;
  error: string | null;
}

const initialState: PopularCarsState = {
  popularCars: [],
  loading: false,
  error: null,
};

const popularCarsSlice = createSlice({
  name: "popularCars",
  initialState,
  reducers: {
    fetchPopularCarsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchPopularCarsSuccess(state, action: PayloadAction<ICar[]>) {
      state.popularCars = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchPopularCarsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchPopularCarsStart,
  fetchPopularCarsSuccess,
  fetchPopularCarsFailure,
} = popularCarsSlice.actions;

export default popularCarsSlice.reducer;
