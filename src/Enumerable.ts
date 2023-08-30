type Elem<T> = T extends Array<infer E>
  ? E
  : T extends Set<infer E>
  ? E
  : T extends Map<infer K, infer V>
  ? [K, V]
  : T extends Record<infer K, infer V>
  ? [K, V]
  : never;

function elems<T>(a: T): Array<Elem<typeof a>> {
  if (Array.isArray(a)) return a;
  if (a instanceof Map) return [...a.entries()];

  return Object.entries(a);
}

const val = elems([1, 2, 3, 4]);

interface EnumerableImpl<Container> {
  count(enumerable: Container): number;
}
