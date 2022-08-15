## 题目描述

实现联合类型的全排列，将联合类型转换成所有可能的全排列数组的联合类型。

```typescript
type perm = Permutation<'A' | 'B' | 'C'>; // ['A', 'B', 'C'] | ['A', 'C', 'B'] | ['B', 'A', 'C'] | ['B', 'C', 'A'] | ['C', 'A', 'B'] | ['C', 'B', 'A']
```

## 解题思路

这道题首先需要了解 [distributive-conditional-types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types)。

关于详细的解题过程可以看[这里](https://github.com/type-challenges/type-challenges/issues/614).

```ts
type Permutation<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation<Exclude<T, K>>]
  : never;
```

### 解释

`[T] extends [never]` 用来检查 `T` 是不是 `never`，至于为什么需要 `[]`，是因为 TypeScript treats never as an empty union when distributing over conditionals.

首先需要了解的是，假设我们有 `T extends U ? X : Y`，并且 `T = 'A' | 'B'`，这时候就会变成分布式条件类型，返回的类型为 `(A extends U ? X : Y) | (B extends U ? X : Y)`。

而当 `never` 出现在上述联合类型中时，TypeScript 会把 `never` 当做一个空的联合类型。

```ts
type TS<T, K> = T extends K ? 'A' : 'B';

type Test1 = TS<string, string>; // 'A'
type Test2 = TS<string | number, string>; // 'A' | 'B'
type Test3 = TS<never, string>; // never
type Test4 = TS<never | string, string>; // 'A'
```

### 总结

#### how to loop union

```ts
type loopUnion<
  Union extends string,
  Item extends string = Union
> = Item extends Item ? `loop ${Item}` : never;
type result = loopUnion<'A' | 'B' | 'C'>; // "loop A" | "loop B" | "loop C"
```

#### how to check `T` is never

```ts
type IsNever<T> = [T] extends [never] ? true : false;
```
