## 题目描述

键入函数 `PromiseAll`，它接受 PromiseLike 对象数组，返回值应为 `Promise<T>`，其中 `T` 是解析的结果数组。

```ts
const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise<string>((resolve, reject) => {
  setTimeout(resolve, 100, 'foo');
});

// expected to be `Promise<[number, 42, string]>`
const p = Promise.all([promise1, promise2, promise3] as const);
```

## 解题思路

首先看给的实现模板：

```ts
declare function PromiseAll(values: any): any;
```

根据题目描述：

1. 接受 PromiseLike 对象数组：可以通过 `T extends any[]` 来限定。
2. 返回值应为 `Promise<T>`，其中 `T` 是解析的结果数组。
3. `Promise.resolve(value)` 的返回类型为 `Promise<T>`。
4. TypeScript 3.1 新特性： [Mapped types on tuples and arrays](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-1.html#mapped-types-on-tuples-and-arrays)

```ts
declare function PromiseAll<T extends any[]>(
  values: readonly [...T]
): Promise<{ [K in keyof T]: T[K] extends Promise<infer R> ? R : T[K] }>;
```
