import { SaleOrder } from './slice';

const selectedQuantity = {
  getQuantity: (state: any) => state?.SaleOrderSlice as SaleOrder,
};

export default selectedQuantity;
