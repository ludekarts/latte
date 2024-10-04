# Latte

Super-minimalistic testing framework to run in browser.

# Usage

On **📝 test.html** include below

```
<script
  type="module"
  src="./latte.js"
  data-latte-test="./my.test.js"
></script>
```

On **📝 my.test.js** write test as usual:

```
describe("Sample tests", () => {

  it("Should be OK", () => {
    expect(1).to.have.equal(1);
  });

  it("Should fail", () => {
    expect(1).to.have.equal(2);
  });

});
```

To run **only** one test case follw code below:

```
only.it("Should run only this one", () => {
  expect(1).to.have.equal(1);
});
```

# HTML API

Script tag gets followign attributes

| Attribute       | Value                 | Required | Description                                                    |
| --------------- | --------------------- | :------: | -------------------------------------------------------------- |
| type            | module                |    ✔️    | Allows for ESM imports in JS code                              |
| src             | path/to/latte.js      |    ✔️    | URL to Latte.js                                                |
| data-latte-test | path/to/spec.js       |    ✔️    | URL to yotu tests                                              |
| data-chai       | path/to/chai.js false |    ➖    | Path to Chai library, or false to disbale default chai loading |
