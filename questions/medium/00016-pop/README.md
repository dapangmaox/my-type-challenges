## 题目描述

实现一个通用`Pop<T>`，它接受一个数组`T`并返回一个没有最后一个元素的数组。

例如

```ts
type arr1 = ['a', 'b', 'c', 'd'];
type arr2 = [3, 2, 1];

type re1 = Pop<arr1>; // expected to be ['a', 'b', 'c']
type re2 = Pop<arr2>; // expected to be [3, 2]
```

**额外**：同样，您也可以实现`Shift`，`Push`和`Unshift`吗？

## 解题思路

使用 `infer` 把数组分成两部分。

```ts
type Pop<T extends any[]> = T extends [...infer R, infer _] ? R : never;
```
