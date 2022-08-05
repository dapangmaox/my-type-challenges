## 题目描述

创建一个通用的`Length`，接受一个`readonly`的数组，返回这个数组的长度。

例如：

```ts
type tesla = ['tesla', 'model 3', 'model X', 'model Y'];
type spaceX = [
  'FALCON 9',
  'FALCON HEAVY',
  'DRAGON',
  'STARSHIP',
  'HUMAN SPACEFLIGHT'
];

type teslaLength = Length<tesla>; // expected 4
type spaceXLength = Length<spaceX>; // expected 5
```

## 解题思路

返回 `T['length']` 即可。

```ts
type Length<T extends readonly any[]> = T['length'];
```
