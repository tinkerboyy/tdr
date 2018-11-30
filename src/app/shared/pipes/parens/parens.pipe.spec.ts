import { ParensPipe } from "./parens.pipe";

describe("ParensPipe", () => {
  const pipe = new ParensPipe();

  it("create an instance", () => {
    expect(pipe).toBeTruthy();
  });

  it("should return without parens", () => {
    const value = "$2.62";
    expect(pipe.transform(value)).toEqual(`$2.62`);
  });

  it("should return with parens", () => {
    const value = "-$2.62";
    expect(pipe.transform(value)).toEqual(`($2.62)`);
  });
});
