import { createSlice } from "@reduxjs/toolkit";
// Initialiseert de state met een lege array en een totaal van 0
const cartSlice = createSlice({
  name: "cart",
  initialState: { list: [], total: 0 },
  reducers: {
    // addToCart reducer die een item toevoegt aan de cart state, of als het item al bestaat wordt de quantity verhoogt.
    addToCart(state, action) {
      const { id, name, price, thumbnail } = action.payload.item;
      const quantity = action.payload.quantity;
      const existingProductIndex = state.list.findIndex(
        (item) => item.id === id
      );
      if (existingProductIndex !== -1) {
        state.list[existingProductIndex].quantity += quantity;
      } else {
        state.list.push({ id, name, price, thumbnail, quantity });
      }
      state.total = state.list.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },
    // removeItem reducer die een item verwijderd uit de cart state, of als het item al bestaat wordt de quantity verlaagd.
    removeItem(state, action) {
      const id = action.payload;
      const existingProductIndex = state.list.findIndex(
        (item) => item.id === id
      );
      if (existingProductIndex !== -1) {
        state.list.splice(existingProductIndex, 1);
      }
      state.total = state.list.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },
    // removeAllItems reducer die alle items verwijderd uit de cart state.
    removeAllItems(state) {
      state.list = [];
      state.total = 0;
    },
  },
});

const { actions, reducer } = cartSlice;
export const { addToCart, removeItem, removeAllItems } = actions;
export default reducer;
