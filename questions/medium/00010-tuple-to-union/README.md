## 题目描述

实现泛型`TupleToUnion<T>`，它返回元组所有值的合集。

例如

```ts
type Arr = ['1', '2', '3'];

type Test = TupleToUnion<Arr>; // expected to be '1' | '2' | '3'
```

## 解题思路

索引访问类型（indexed access type）可以使用 number 来获取数组元素的类型。

```ts
type TupleToUnion<T extends readonly unknown[]> = T[number];
```
