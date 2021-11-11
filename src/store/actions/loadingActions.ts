import {Dispatch} from 'react';

export interface StartLoadingAction {
  readonly type: 'ON_START';
  payload: {};
}

export interface StopLoadingAction {
  readonly type: 'ON_STOP';
  payload: {};
}

export type LoadingAction = StartLoadingAction | StopLoadingAction;

export const onLoading = (type: boolean) => {
  return async (dispatch: Dispatch<LoadingAction>) => {
    try {
      if (type) {
        dispatch({
          type: 'ON_START',
          payload: true,
        });
      } else {
        dispatch({
          type: 'ON_STOP',
          payload: false,
        });
      }
    } catch (error) {
      dispatch({
        type: 'ON_STOP',
        payload: false,
      });
    }
  };
};
