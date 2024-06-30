import { combineReducers } from 'redux';
import ConfigSlice, { namespace as ConfigNamespace } from './config/slice';
import AddressSlice, { namespace as AddressNamespace } from './address/slice';
import ConnectionSlice, { namespace as ConnectionNamespace } from './connection/slice';
import AuthenticationSlice, { namespace as AuthenticationNamespace } from './authentication/slice';

export default combineReducers({
  [ConfigNamespace]: ConfigSlice,
  [AddressNamespace]: AddressSlice,
  [ConnectionNamespace]: ConnectionSlice,
  [AuthenticationNamespace]: AuthenticationSlice,
});
