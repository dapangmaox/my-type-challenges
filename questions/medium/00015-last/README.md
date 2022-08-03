## 题目描述

实现一个通用`Last<T>`，它接受一个数组`T`并返回其最后一个元素的类型。

例如

```ts
type arr1 = ['a', 'b', 'c'];
type arr2 = [3, 2, 1];

type tail1 = Last<arr1>; // expected to be 'c'
type tail2 = Last<arr2>; // expected to be 1
```

## 解题思路

要获取最后一个，可以递归 First 的实现，判断剩下的部分，直到剩下的部分 length 为 0，说明已经遍历到了最后一个位置。

```ts
type Last<T extends any[]> = T extends [infer _, ...infer R]
  ? R['length'] extends 0
    ? _
    : Last<R>
  : never;
```

## 其他实现

### 实现 1

添加一个元素，解构 T，这样 T['length'] 就是最后一个元素。

```ts
type Last<T extends any[]> = [any, ...T]T['length']];
```

### 实现 2

另外一种方法是使用 `infer`，和推断数组中第一个元素类似。

在数组结构中，`...` 必须放在最后面，但是在 TypeScript 的类型系统中则可以放在前面。

```ts
type Last<T extends any[]> = T extends [...infer _, infer L] ? L : never;
```

`...infer _` 获取的是最后一个元素之前的所有元素类型，`infer L` 获取最后一个元素类型。
