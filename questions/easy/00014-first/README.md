## 题目描述

> 欢迎 PR 改进翻译质量。

实现一个通用 `First<T>`，它接受一个数组 `T` 并返回它的第一个元素的类型。

例如：

```ts
type arr1 = ['a', 'b', 'c'];
type arr2 = [3, 2, 1];

type head1 = First<arr1>; // expected to be 'a'
type head2 = First<arr2>; // expected to be 3
```

## 解题思路

为了获取第一个元素，可以将数组分为两部分：第一个元素和其他部分，可以使用 infer。

```ts
type First<T extends any[]> = T extends [infer P, ...any[]] ? P : never;
```

在网上看到了另一种答案，使用数组的 length。

```ts
type First<T extends any[]> = T['length'] extends 0 ? never : T[0];
```
