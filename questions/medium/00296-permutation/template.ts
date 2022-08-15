type Permutation<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation<Exclude<T, K>>]
  : never;

type TS<T, K> = T extends K ? 'A' : 'B';

type Test1 = TS<string, string>; // 'A'
type Test2 = TS<string | number, string>; // 'A' | 'B'
type Test3 = TS<never | string, string>; // never
type Test4 = TS<never | string, string>; // 'A'
