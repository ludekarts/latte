const { expect } = window.chai;

describe("Use spies", () => {
  it("Should be callend once", () => {
    const actionSpy = chai.spy();
    actionSpy();
    expect(actionSpy).to.have.been.called.once;
  });

  it("Should be called w/ args", () => {
    const actionSpy = chai.spy();
    actionSpy(1);
    expect(actionSpy).to.have.been.called.with(1);
  });
});
