import {combineReducers} from 'redux';
import {LoadingReducer} from './loadingReducer';
import {MoviesReducer} from './moviesReducer';

const rootReducer = combineReducers({
  loadingReducer: LoadingReducer,
  moviesReducer: MoviesReducer,
});

export type ApplicationState = ReturnType<typeof rootReducer>;

export {rootReducer};
