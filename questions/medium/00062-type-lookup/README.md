## 题目描述

有时，您可能希望根据其属性在并集中查找类型。

在此挑战中，我们想通过在联合 `Cat | Dog` 中搜索公共 `type` 字段来获取相应的类型。换句话说，在以下示例中，我们期望 `LookUp<Dog | Cat, 'dog'>` 获得 `Dog`，`LookUp<Dog | Cat, 'cat'>` 获得 `Cat`。

```ts
interface Cat {
  type: 'cat';
  breeds: 'Abyssinian' | 'Shorthair' | 'Curl' | 'Bengal';
}

interface Dog {
  type: 'dog';
  breeds: 'Hound' | 'Brittany' | 'Bulldog' | 'Boxer';
  color: 'brown' | 'white' | 'black';
}

type MyDog = LookUp<Cat | Dog, 'dog'>; // expected to be `Dog`
```

## 解题思路

遍历联合类型的 `type` 字段，如果类型等于 `T`，直接返回。

Q：怎么获取泛型上某个字段的类型？
A：不能在 `U` 上读属性，但是可以通过 `extends { type: T }` 来判断。简单来说，不是判断属性，而是判断对象的 shape

所以正确思路：判断类型是不是 `extends { type: T }`。

```ts
type LookUp<U, T> = U extends { type: T } ? U : never;
```
