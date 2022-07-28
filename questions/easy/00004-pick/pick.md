## 题目描述

实现 TS 内置的 `Pick<T, K>`，但不可以使用它。

**从类型 `T` 中选择出属性 `K`，构造成一个新的类型**。

例如：

```ts
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview = MyPick<Todo, 'title' | 'completed'>;

const todo: TodoPreview = {
  title: 'Clean room',
  completed: false
};
```

## 解题思路

遍历 `K`，类型为 `T[P]`。

```ts
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P];
};
```
