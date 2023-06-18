import {
  configureStore,
  ThunkAction,
  Action,
  Reducer,
  AnyAction,
} from "@reduxjs/toolkit";

interface Car {
  id: string;
  thumbnailSrc: string;
  name: string;
  gearType: string;
  gasTank: string;
  passenger: string;
  dailyPrice: string;
  monthlyPrice: string;
  discountPrice: string;
  vehicle: string;
  mileage: string;
}

interface CarsState {
  cars: Car[];
}

const initialState: CarsState = {
  cars: [],
};

const carsReducer: Reducer<CarsState, AnyAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case "ADD_CAR":
      return {
        ...state,
        cars: [...state.cars, action.payload],
      };
    case "REMOVE_CAR":
      return {
        ...state,
        cars: state.cars.filter((car) => car.id !== action.payload),
      };
    case "FETCH_ALL_CARS":
      return {
        ...state,
        cars: action.payload,
      };
    default:
      return state;
  }
};

export const store = configureStore({
  reducer: {
    cars: carsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
