import { createStore } from 'redux';
import { createWrapper, MakeStore } from 'next-redux-wrapper';
import rootReducer from '../reducer';

/** store */
const configuration: MakeStore<any> = () => {
  const store = createStore(rootReducer);
  return store;
};

/** wrapper */
const wrapper = createWrapper(configuration);

export default wrapper;
