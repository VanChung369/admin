import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { omit } from 'lodash';

export interface SaleOrder {
  quantity: number;
}

const initialState: SaleOrder = {
  quantity: 0,
};

export const SaleOrderSlice = createSlice({
  name: 'saleOrder',
  initialState,
  reducers: {
    handleSetQuantity: (state: SaleOrder, action: PayloadAction<any>) => {
      const { quantity } = action.payload;
      return {
        ...state,
        quantity,
      };
    },
  },
});

export const { handleSetQuantity } = SaleOrderSlice.actions;

export const namespace = 'SaleOrderSlice';

export default SaleOrderSlice.reducer;
