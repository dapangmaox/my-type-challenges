## 题目描述

计算字符串的长度，类似于 `String#length` 。

## 解题思路

在 TypeScript 类型中，string 是没有办法获取长度的。一般说到获取长度，最常见的就是数组上的 `length` 属性。

所以，我们可以考虑先把 string 转为 array，再读取长度。

```ts
type String2Array<S extends string> = S extends `${infer First}${infer Rest}`
  ? [First, ...String2Array<Rest>]
  : [];

type LengthOfStringMedium<S extends string> = String2Array<S>['length'];
```
