## 题目描述

实现`Trim<T>`，它是一个字符串类型，并返回一个新字符串，其中两端的空白符都已被删除。

例如

```ts
type trimed = Trim<'  Hello World  '>; // expected to be 'Hello World'
```

## 解题思路

接着上一题的思路，先去除左边的空格，再去除右边的空格。

```ts
type TrimLeft1<S extends string> = S extends `${' ' | '\n' | '\t'}${infer R}`
  ? TrimLeft1<R>
  : S;
type TrimRight1<S extends string> = S extends `${infer R}${' ' | '\n' | '\t'}`
  ? TrimRight1<R>
  : S;

type Trim<S extends string> = TrimLeft1<TrimRight1<S>>;
```

但是这种方式写起来比较繁琐，我们能不能在一个条件中判断左边或者右边有空格呢？

答案是可以的，我们可以使用 `|`。

```ts
type Space = ' ' | '\n' | '\t';
type Trim<S extends string> = S extends
  | `${Space}${infer R}`
  | `${infer R}${Space}`
  ? Trim<R>
  : S;
```
