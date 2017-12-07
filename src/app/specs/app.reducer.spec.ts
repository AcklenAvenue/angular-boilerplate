import * as app from "../app.action";
import { appReducer } from "../app.reducer";

describe("App Reducer", () => {
  let state = {
    votes: 0
  };
  beforeEach(() => {
    state = {
      votes: 0
    };
  });
  it("should increment the votes", () => {
    const action: app.Actions = {
      type: app.INCREMENT,
      payload: 5
    };
    const result = appReducer(state, action);
    expect(result.votes).toEqual(5);
  });
  it("should decrement the votes", () => {
    const action: app.Actions = {
      type: app.DECREMENT,
      payload: 5
    };
    const result = appReducer(state, action);
    expect(result.votes).toEqual(-5);
  });
  it("should reset the votes", () => {
    const action: app.Actions = {
      type: app.RESET
    };
    const result = appReducer(state, action);
    expect(result.votes).toEqual(0);
  });
  it("should return the votes if type doesnt exist", () => {
    const action: app.Actions = {
      type: undefined
    };
    const result = appReducer(undefined, action);
    expect(result.votes).toEqual(0);
  });
});
