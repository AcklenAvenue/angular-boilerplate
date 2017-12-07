import { Action } from "@ngrx/store";
import * as app from "./app.action";
import { InitialState } from "@ngrx/store/src/models";

export interface State {
  votes: number;
}

export const initialState: State = {
  votes: 0
};

export function appReducer(state = initialState, action: app.Actions) {
  let value = 0;
  switch (action.type) {
    case app.INCREMENT:
      value = action.payload;
      return { ...state, votes: state.votes + value };

    case app.DECREMENT:
      value = action.payload;
      return { ...state, votes: state.votes - value };

    case app.RESET:
      return { ...state, votes: 0 };

    default:
      return state;
  }
}
