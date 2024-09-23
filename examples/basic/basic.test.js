describe("Basic tests", () => {
  it("Should be OK", () => {
    expect(1).to.have.equal(1);
  });

  it("Should fail", () => {
    expect(1).to.have.equal(2);
  });
});
