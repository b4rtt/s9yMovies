import {LoadingAction} from '../actions/loadingActions';

type loadingState = {
  loading: any;
};

const initialState = {
  loading: false as any,
};

const LoadingReducer = (
  state: loadingState = initialState,
  action: LoadingAction,
) => {
  switch (action.type) {
    case 'ON_START':
      return {
        ...state,
        loading: action.payload,
      };
    case 'ON_STOP':
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};

export {LoadingReducer};
