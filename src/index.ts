type Either<Ok, Error> = { ok: Ok } | { error: Error };

type Acc<T> = { cont: T } | { halt: T } | { suspend: T };

type Continuation<T> = (acc: Acc<T>) => Result<T>;

type Result<T> =
  | { done: T }
  | { halted: T }
  | { suspended: T; continuation: Continuation<T> };

type Reducer<A, B> = (element: A, acc: B) => Acc<B>;

type SlicingFun<Element> = (
  start: number,
  length: number,
  step: number,
) => Array<Element>;
type ToListFun<Enumerable, Element> = (
  enumerable: Enumerable,
) => Array<Element>;

interface EnumerableImpl<Enumerable, Element> {
  count(
    enumerable: Enumerable,
  ): Either<number, EnumerableImpl<Enumerable, Element>>;

  member(
    enumerable: Enumerable,
    element: Element,
  ): Either<boolean, EnumerableImpl<Enumerable, Element>>;

  reduce<Returned, T = Element>(
    enumerable: Enumerable,
    acc: Acc<Returned>,
    reducer: Reducer<T, Returned>,
  ): Result<Returned>;

  slice(
    enumerable: Enumerable,
  ): Either<
    [number, SlicingFun<Element> | ToListFun<Enumerable, Element>],
    EnumerableImpl<Enumerable, Element>
  >;
}

export const NumberArrayEnumerableImpl: EnumerableImpl<
  Array<number>,
  number
> = {
  count(array) {
    return { ok: array.length };
  },

  member(_array, _element) {
    return { error: NumberArrayEnumerableImpl };
  },

  reduce(array, acc, fun) {
    if ("halt" in acc) {
      return { halted: acc.halt };
    } else if ("suspend" in acc) {
      return {
        suspended: acc.suspend,
        continuation: (acc2) =>
          NumberArrayEnumerableImpl.reduce(array, acc2, fun),
      };
    } else {
      if (array.length) {
        const [head, ...tail] = array;
        return NumberArrayEnumerableImpl.reduce(tail, fun(head, acc.cont), fun);
      } else {
        return { done: acc.cont };
      }
    }
  },

  slice(_array) {
    return { error: NumberArrayEnumerableImpl };
  },
};

export const all = <Enumerable, Element>(
  { reduce }: EnumerableImpl<Enumerable, Element>,
  enumerable: Enumerable,
  fun: (a: Element) => boolean,
) => {
  const predicate = (entry: Element, _: boolean): Acc<boolean> =>
    fun(entry) ? { cont: true } : { halt: false };
  return reduce(enumerable, { cont: true }, predicate);
};
