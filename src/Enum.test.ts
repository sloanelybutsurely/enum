import { jest, describe, expect, it } from "@jest/globals";
import * as Enum from "./Enum";

describe("all", () => {
  it("returns true if all contained values are truthy", () => {
    expect(Enum.all(["cool", 3, {}])).toBe(true);
  });
  it("returns false if any contained value is falsey", () => {
    expect(Enum.all(["cool", 3, 0])).toBe(false);
  });
  it("returns true for an empty enumerable", () => {
    expect(Enum.all([])).toBe(true);
  });
  it("returns true if the predicate returns true for all elements", () => {
    expect(Enum.all([2, 4, 6, 8], (x) => x % 2 === 0)).toBe(true);
  });
  it("returns false if the predicate returns false for any of the elements", () => {
    expect(Enum.all([2, 4, 6, 8, 9], (x) => x % 2 === 0)).toBe(false);
  });
});

describe("any", () => {
  it("returns false for an empty enumerable", () => {
    expect(Enum.any([])).toBe(false);
  });
  it("returns true if any of the values are truthy", () => {
    expect(Enum.any([false, false, "truthy!"])).toBe(true);
  });
  it("returns false if none of values are truthy", () => {
    expect(Enum.any([0, false, ""])).toBe(false);
  });
  it("return true if the predicate returns a truthy value for any of the elements", () => {
    expect(Enum.any([1, 2, 3, 4, 5], (x) => x === 3)).toBe(true);
  });
  it("returns false if the predicate returns a falsey value for all of the elements", () => {
    expect(Enum.any([1, 2, 3, 4, 5], (x) => x === 6)).toBe(false);
  });
});

describe("at", () => {
  it("returns the value at the given index", () => {
    expect(Enum.at([1, 2, 3], 1)).toBe(2);
  });
  it("returns the value at the given index, from the back of the enumerable when the index is negative", () => {
    expect(Enum.at([1, 2, 3], -1)).toBe(3);
  });
  it("returns null if the index does not exist", () => {
    expect(Enum.at([1, 2, 3], 7)).toBe(null);
  });
  it("returns the default value if provided and the index does not exist", () => {
    expect(Enum.at([1, 2, 3], 7, "default")).toBe("default");
  });
});

describe("concat", () => {
  it("concats two enumerables", () => {
    expect(Enum.concat([], [3, 4])).toEqual([3, 4]);
    expect(Enum.concat([1, 2], [])).toEqual([1, 2]);
    expect(Enum.concat([1, 2], [3, 4])).toEqual([1, 2, 3, 4]);
  });
});

describe("count", () => {
  it("returns the number of elements in the enumerable", () => {
    expect(Enum.count([])).toBe(0);
    expect(Enum.count(["one"])).toBe(1);
    expect(Enum.count([2, 4, 6, 8])).toBe(4);
  });
  it("returns the number of elements in the enumerable for which the predicate returns a truthy value", () => {
    expect(Enum.count([], (_) => true)).toBe(0);
    expect(Enum.count([1, 2, 3, 4], (x) => x % 2 === 0)).toBe(2);
  });
});

describe("drop", () => {
  it("drops count elements from the front of the enumerable", () => {
    expect(Enum.drop([1, 2, 3, 4, 5], 0)).toEqual([1, 2, 3, 4, 5]);
    expect(Enum.drop([1, 2, 3, 4, 5], 2)).toEqual([3, 4, 5]);
  });
  it("drops count element from the end of the enumerable when given a negative count", () => {
    expect(Enum.drop([1, 2, 3, 4, 5], -2)).toEqual([1, 2, 3]);
  });
});

describe("each", () => {
  it("calls the iterator function with each of the elements and does not return a value", () => {
    const fun = jest.fn();
    expect(Enum.each([1, 2, 3, 4], fun)).toBeUndefined();
    expect(fun).toHaveBeenCalledWith(1);
    expect(fun).toHaveBeenCalledWith(2);
    expect(fun).toHaveBeenCalledWith(3);
    expect(fun).toHaveBeenCalledWith(4);
  });
});

describe("empty", () => {
  it("returns true when the enumerable is empty", () => {
    expect(Enum.empty([])).toBe(true);
  });
  it("returns false when the enumerable is not empty", () => {
    expect(Enum.empty([1])).toBe(false);
    expect(Enum.empty([1, 2])).toBe(false);
  });
});
