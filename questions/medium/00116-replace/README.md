## 题目描述

实现 `Replace<S, From, To>` 将字符串 `S` 中的第一个子字符串 `From` 替换为 `To` 。

例如

```ts
type replaced = Replace<'types are fun!', 'fun', 'awesome'>; // 期望是 'types are awesome!'
```

## 解题思路

把字符串分成任意三部分，判断字符串是不是包含 `From` 部分，如果是，替换成 `To`。

一般涉及到字符串替换，最常想到的就是模板字面量类型 + `infer`。

```ts
type Replace<
  S extends string,
  From extends string,
  To extends string
> = S extends `${infer L}${From}${infer R}` ? `${L}${To}${R}` : S;
```

但是这个实现并不满足下面的 test case。

```ts
Expect<Equal<Replace<'foobarbar', '', 'foo'>, 'foobarbar'>>,
```

是因为当 `From` 为空的时候，也满足 extends 条件，这样会把 To 插入到字符串中。为了解决这个问题，需要加一层判断，判断 `From` 是不是为空字符串。

```ts
type Replace<
  S extends string,
  From extends string,
  To extends string
> = S extends `${infer L}${From}${infer R}`
  ? From extends ''
    ? S
    : `${L}${To}${R}`
  : S;
```
