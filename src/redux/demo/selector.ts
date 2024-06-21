import { Demo } from './slice';

const selectDemo = {
  getCount: (state: any) => state?.count as Demo,
};

export default selectDemo;
