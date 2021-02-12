import { AnyAction } from 'redux';

const initialState = {
  user: {
    email: 'bgpark82@gmail.com',
    profile: '',
  },
};

const reducer = (state: any = initialState, action: AnyAction) => {
  switch (action.type) {
    case 'TEST':
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
