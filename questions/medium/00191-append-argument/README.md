## 题目描述

实现一个泛型 `AppendArgument<Fn, A>`，对于给定的函数类型 `Fn`，以及一个任意类型 `A`，返回一个新的函数 `G`。`G` 拥有 `Fn` 的所有参数并在末尾追加类型为 `A` 的参数。

```typescript
type Fn = (a: number, b: string) => number;

type Result = AppendArgument<Fn, boolean>;
// 期望是 (a: number, b: string, x: boolean) => number
```

## 解题思路

先获取 `Fn` 的参数和返回类型，再返回一个新的函数，参数为 `Fn` 的参数 + `A`，返回类型为 `Fn` 的返回类型。

```ts
type AppendArgument<Fn, A> = Fn extends (...args: infer P) => infer R
  ? (...args: [...P, A]) => R
  : Fn;
```

需要注意的是，在返回新的函数时参数的写法。
