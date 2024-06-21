import { combineReducers } from 'redux';
import DemoSlice, { namespace as DemoNamespace } from './demo/slice';

export default combineReducers({
  [DemoNamespace]: DemoSlice,
});
