import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PaymentState {
  reference: string | null;
}

const initialPaymentState: PaymentState = {
  reference: null,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState: initialPaymentState,
  reducers: {
    setReference(state, action: PayloadAction<string>) {
      state.reference = action.payload;
    },
  },
});

export const { setReference } = paymentSlice.actions;

export default paymentSlice.reducer;
