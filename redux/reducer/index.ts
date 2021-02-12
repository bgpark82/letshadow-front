import { HYDRATE } from 'next-redux-wrapper';
import { AnyAction, combineReducers } from 'redux';
import user from './user';

/** reducer */
const rootReducer = (state: any, action: AnyAction) => {
  switch (action.type) {
    case HYDRATE:
      return action.payload;
    default: {
      const combinedReducer = combineReducers({ user });
      return combinedReducer(state, action);
    }
  }
};

export default rootReducer;
