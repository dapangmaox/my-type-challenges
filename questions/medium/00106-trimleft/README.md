## 题目描述

实现 `TrimLeft<T>` ，它接收确定的字符串类型并返回一个新的字符串，其中新返回的字符串删除了原字符串开头的空白字符串。

例如

```ts
type trimed = TrimLeft<'  Hello World  '>; // 应推导出 'Hello World  '
```

## 解题思路

使用 `infer` 加递归。

判断字符串第一个字符是不是空格，如果是，去掉第一个空格，将剩下的递归调用，如果不是则返回。

```ts
type Space = ' ' | '\n' | '\t';
type TrimLeft<S extends string> = S extends `${Space}${infer R}`
  ? TrimLeft<R>
  : S;
```

也可以不单独声明 `Space` 类型，改为：

```ts
type TrimLeft<S extends string> = S extends `${' ' | '\n' | '\t'}${infer R}`
  ? TrimLeft<R>
  : S;
```
