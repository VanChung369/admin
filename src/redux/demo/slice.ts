import { createSlice } from '@reduxjs/toolkit';

export interface Demo {
  count: number;
}

const initialState: Demo = {
  count: 0,
};

export const DemoSlice = createSlice({
  name: 'demo',
  initialState,
  reducers: {
    handleSetDemo: (state: Demo, action: any) => {
      let count = 0;
      switch (action.type) {
        case 'INCREMENT':
          count = state.count + 1;
          break;
        case 'DECREMENT':
          count = state.count - 1;
          break;
        default:
          break;
      }

      return {
        ...state,
        count: count,
      };
    },
  },
});

export const { handleSetDemo } = DemoSlice.actions;

export const namespace = 'DemoSlice';

export default DemoSlice.reducer;
