import {LoadMovies} from '../actions/moviesActions';

type MoviesState = {
  movies: any;
};

const initialState = {
  movies: [],
};

const MoviesReducer = (
  state: MoviesState = initialState,
  action: LoadMovies,
) => {
  switch (action.type) {
    case 'LOAD_MOVIES':
      return {
        ...state,
        movies: action.payload,
      };

    default:
      return state;
  }
};

export {MoviesReducer};
