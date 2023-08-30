type Either<Ok, Error> = { ok: Ok } | { error: Error };

type Acc<T> = { cont: T } | { halt: T } | { suspend: T };

type Continuation<T> = (acc: Acc<T>) => Result<T>;

type Result<T> =
  | { done: T }
  | { halted: T }
  | { suspended: T; continuation: Continuation<T> };

type Reducer<A, B> = (element: A, current_acc: Acc<B>) => Acc<B>;

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

  reduce<Returned>(
    enumerable: Enumerable,
    acc: Acc<Returned>,
    reducer: Reducer<Element, Returned>,
  ): Result<Returned>;

  slice(
    enumerable: Enumerable,
  ): Either<
    [number, SlicingFun<Element> | ToListFun<Enumerable, Element>],
    EnumerableImpl<Enumerable, Element>
  >;
}

// all?/1
// all?/2
// any?/1
// any?/2
// at/3
// chunk_by/2
// chunk_every/2
// chunk_every/4
// chunk_while/4
// concat/1
// concat/2
// count/1
// count/2
// count_until/2
// count_until/3
// dedup/1
// dedup_by/2
// drop/2
// drop_every/2
// drop_while/2
// each/2
// empty?/1
// fetch/2
// fetch!/2
// filter/2
// find/3
// find_index/2
// find_value/3
// flat_map/2
// flat_map_reduce/3
// frequencies/1
// frequencies_by/2
// group_by/3
// intersperse/2
// into/2
// into/3
// join/2
// map/2
// map_every/3
// map_intersperse/3
// map_join/3
// map_reduce/3
// max/3
// max_by/4
// member?/2
// min/3
// min_by/4
// min_max/2
// min_max_by/4
// product/1
// random/1
// reduce/2
// reduce/3
// reduce_while/3
// reject/2
// reverse/1
// reverse/2
// reverse_slice/3
// scan/2
// scan/3
// shuffle/1
// slice/2
// slice/3
// slide/3
// sort/1
// sort/2
// sort_by/3
// split/2
// split_while/2
// split_with/2
// sum/1
// take/2
// take_every/2
// take_random/2
// take_while/2
// to_list/1
// uniq/1
// uniq_by/2
// unzip/1
// with_index/2
// zip/1
// zip/2
// zip_reduce/3
// zip_reduce/4
// zip_with/2
// zip_with/3
