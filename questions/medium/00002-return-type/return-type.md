## 题目描述

不使用 `ReturnType` 实现 TypeScript 的 `ReturnType<T>` 泛型。

例如：

```ts
const fn = (v: boolean) => {
  if (v) return 1;
  else return 2;
};

type a = MyReturnType<typeof fn>; // 应推导出 "1 | 2"
```

## 解题思路

TypeScript 内置的 `ReturnType<T>` 类型用于获取函数类型 `T` 的返回类型。

一般对于获取某种类型的题型，我们首先会想到的就是 [infer](../../../README.md#infer)。

```ts
type MyReturnType<T extends (...args: any) => any> = T extends (
  ...args: any
) => infer P
  ? P
  : any;
```
