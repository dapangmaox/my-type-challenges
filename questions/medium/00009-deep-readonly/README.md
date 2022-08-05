## 题目描述

实现一个通用的`DeepReadonly<T>`，它将对象的每个参数及其子对象递归地设为只读。

您可以假设在此挑战中我们仅处理对象。数组，函数，类等都无需考虑。但是，您仍然可以通过覆盖尽可能多的不同案例来挑战自己。

例如

```ts
type X = {
  x: {
    a: 1;
    b: 'hi';
  };
  y: 'hey';
};

type Expected = {
  readonly x: {
    readonly a: 1;
    readonly b: 'hi';
  };
  readonly y: 'hey';
};

type Todo = DeepReadonly<X>; // should be same as `Expected`
```

## 解题思路

看见 deep，最先想到的就是递归。

终止条件：`key` 是基本类型：`keyof key extends never`。

```ts
type DeepReadonly<T> = {
  readonly [P in keyof T]: keyof T[P] extends never ? T[P] : DeepReadonly<T[P]>;
};
```

网上关于这个实现是有争论的，原因在于基本类型比如 string，在使用 `keyof` 操作符的时候也会有一系列属性和方法返回。

> 在网上偶然看到了一个答案：
> `DeepReadonly<string>` 是字符串，因为只读只能应用于数组文字和对象的属性。与 `Readonly<string>` 为 `string` 或 `readonly string` 是无效语法的原因相同。
> https://cloud.tencent.com/developer/ask/sof/702690

```ts
type TS = keyof string extends never ? true : false; // false
```

所以有人推荐用 `extends object`，[what-is-extends-never-used-for](https://stackoverflow.com/questions/68693054/what-is-extends-never-used-for)
