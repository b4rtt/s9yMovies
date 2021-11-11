import axios from 'axios';
import {Dispatch} from 'react';

export interface MoviesInterface {
  readonly type: 'LOAD_MOVIES';
  payload: any;
}

export type LoadMovies = MoviesInterface;

export const loadMovies = () => {
  return async (dispatch: Dispatch<MoviesInterface>) => {
    try {
      const response = await axios.get<any>(
        'https://raw.githubusercontent.com/RyanHemrick/star_wars_movie_app/master/movies.json',
      );

      if (!response) {
      } else {
        dispatch({
          type: 'LOAD_MOVIES',
          payload: response.data.movies,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
