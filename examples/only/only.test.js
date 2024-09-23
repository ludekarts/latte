describe("Run only one test", () => {
  it("Should not run", () => {
    expect(1).to.have.equal(1);
  });

  only.it("Should run", () => {
    expect(1).to.have.equal(1);
  });

  it("Should also not run", () => {
    expect(1).to.have.equal(2);
  });
});
