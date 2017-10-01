import { combineReducers } from 'redux-immutable';
import { routerReducer } from 'react-router-redux';
import home from './home/HomeReducer';
import user from './user/UserReducer';
const rootReducer = combineReducers({
  home,
  user,
  router: routerReducer,
});

export default rootReducer;