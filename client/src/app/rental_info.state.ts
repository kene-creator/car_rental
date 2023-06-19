import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RentalInfoState {
  pickUpLocation: string;
  pickUpDate: string | null;
  pickUpTime: string;
  dropOffLocation: string;
  dropOffDate: string | null;
  dropOffTime: string;
}

const initialState: RentalInfoState = {
  pickUpLocation: "",
  pickUpDate: "",
  pickUpTime: "",
  dropOffLocation: "",
  dropOffDate: "",
  dropOffTime: "",
};

const rentalInfoSlice = createSlice({
  name: "rentalInfo",
  initialState,
  reducers: {
    setPickUpLocation(state, action: PayloadAction<string>) {
      state.pickUpLocation = action.payload;
    },
    setPickUpDate(state, action: PayloadAction<string>) {
      state.pickUpDate = action.payload;
    },
    setPickUpTimeState(state, action: PayloadAction<string>) {
      state.pickUpTime = action.payload;
    },
    setDropOffLocation(state, action: PayloadAction<string>) {
      state.dropOffLocation = action.payload;
    },
    setDropOffDate(state, action: PayloadAction<string>) {
      state.dropOffDate = action.payload;
    },
    setDropOffTime(state, action: PayloadAction<string>) {
      state.dropOffTime = action.payload;
    },
  },
});

export const {
  setPickUpLocation,
  setPickUpDate,
  setPickUpTimeState,
  setDropOffLocation,
  setDropOffDate,
  setDropOffTime,
} = rentalInfoSlice.actions;

export default rentalInfoSlice.reducer;
