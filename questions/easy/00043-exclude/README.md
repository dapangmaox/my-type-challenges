## 题目描述

实现内置的 Exclude <T, U>类型，但不能直接使用它本身。

> 从联合类型 T 中排除 U 的类型成员，来构造一个新的类型。

## 解题思路

`Exclude` 的两个泛型都是联合类型。

在字符串联合类型使用 extends 的时候，会自动一个值一个值的去比较。

```ts
type MyExclude<T, U> = T extends U ? never : T;
```
