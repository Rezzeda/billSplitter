import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Guest } from '../types/guest';
import { Dish } from '../types/dish';

const sliceName = "bill";

interface BillState {
  guests: Guest[];
  dishes: Dish[];
}

const initialState: BillState = {
  guests: [],
  dishes: [],
};

export const billSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    addGuest(state, action: PayloadAction<string>) {
      const newGuest: Guest = {
        id: crypto.randomUUID(),
        name: action.payload,
        total: 0,
      };
      state.guests.push(newGuest);
    },
    addDish(state, action: PayloadAction<Omit<Dish, 'id'>>) {
      const newDish: Dish = { ...action.payload, id: crypto.randomUUID() };
      state.dishes.push(newDish);

      // Распределение цены между гостями
      const share = newDish.price / newDish.sharedBy.length;
      newDish.sharedBy.forEach((guestId) => {
        const guest = state.guests.find((g) => g.id === guestId);
        if (guest) guest.total += share;
      });
    },
    updateGuests(state, action: PayloadAction<Guest[]>) {
      state.guests = action.payload;
    },
    resetBill: () => initialState,
  },
});

export const { addGuest, addDish, updateGuests, resetBill } = billSlice.actions;
export default billSlice.reducer;