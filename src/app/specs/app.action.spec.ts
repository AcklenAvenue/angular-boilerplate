import * as app from "../app.action";

describe("App Actions", () => {
  it("should set INCREMENT as the type", () => {
    const action = new app.Increment(0);
    expect(action.type).toEqual(app.INCREMENT);
  });
  it("should set DECREMENT as the type", () => {
    const action = new app.Decrement(0);
    expect(action.type).toEqual(app.DECREMENT);
  });
  it("should set RESET as the type", () => {
    const action = new app.Reset();
    expect(action.type).toEqual(app.RESET);
  });
});
