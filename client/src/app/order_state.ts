import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface OrderState {
  referenceCode: string | null;
  products: Array<{ id: string }>;
}

const initialOrderState: OrderState = {
  referenceCode: null,
  products: [],
};

const orderSlice = createSlice({
  name: "order",
  initialState: initialOrderState,
  reducers: {
    setReference(state, action: PayloadAction<string>) {
      state.referenceCode = action.payload;
    },
    addProduct(state, action: PayloadAction<string>) {
      state.products.push({ id: action.payload });
    },
    removeProduct(state, action: PayloadAction<string>) {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    },
    clearProducts(state) {
      state.products = [];
    },
  },
});

export const { setReference, addProduct, removeProduct, clearProducts } =
  orderSlice.actions;

export default orderSlice.reducer;
