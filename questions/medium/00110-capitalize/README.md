## 题目描述

实现 `Capitalize<T>` 它将字符串的第一个字母转换为大写，其余字母保持原样。

例如

```ts
type capitalized = Capitalize<'hello world'>; // expected to be 'Hello world'
```

## 解题思路

建立一个小写字母到大写字母的 mapping，判断第一个字母是不是小写，是的话替换成大写。

```ts
type MyCapitalize<S extends string> = S extends `${infer F}${infer Rest}`
  ? F extends keyof Alphabet
    ? `${Alphabet[F]}${Rest}`
    : S
  : S;
```
