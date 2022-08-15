## 题目描述

实现 `ReplaceAll<S, From, To>` 将一个字符串 `S` 中的所有子字符串 `From` 替换为 `To`。

例如

```ts
type replaced = ReplaceAll<'t y p e s', ' ', ''>; // 期望是 'types'
```

## 解题思路

接着上一题的 Replace，在返回结果的地方，继续调用 ReplaceAll。

```ts
type ReplaceAll<
  S extends string,
  From extends string,
  To extends string
> = S extends `${infer L}${From}${infer R}`
  ? From extends ''
    ? S
    : ReplaceAll<`${L}${To}${R}`, From, To>
  : S;
```

但是这个实现没有满足下面的两个 test case。

```ts
  Expect<Equal<ReplaceAll<'foobarfoobar', 'ob', 'b'>, 'fobarfobar'>>,
  Expect<Equal<ReplaceAll<'foboorfoboar', 'bo', 'b'>, 'foborfobar'>>,
```

仔细观察这个 case，`S` 中包含 `oob`，我们期望得到的结果是 `ob`，也就是说，对于替换之后又出现了 `From` 部分，是不需要继续替换的。

那么有什么办法可以满足这种情况呢？我们只需要从左到右找一遍，对于已经查找过的部分，不需要再查找了。

也就是说，我们在递归调用的时候，`Left` 和 `To` 部分就不再参与了，直接拼在字符串的前面。

```ts
type ReplaceAll<
  S extends string,
  From extends string,
  To extends string
> = S extends `${infer L}${From}${infer R}`
  ? From extends ''
    ? S
    : `${L}${To}${ReplaceAll<R, From, To>}`
  : S;
```
