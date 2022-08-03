## 题目描述

实现一个通用 `MyReadonly2<T, K>`，它带有两种类型的参数 `T` 和 `K`。

`K` 指定应设置为 Readonly 的 `T` 的属性集。如果未提供 `K`，则应使所有属性都变为只读，就像普通的 `Readonly<T>` 一样。

例如

```ts
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

const todo: MyReadonly2<Todo, 'title' | 'description'> = {
  title: 'Hey',
  description: 'foobar',
  completed: false
};

todo.title = 'Hello'; // Error: cannot reassign a readonly property
todo.description = 'barFoo'; // Error: cannot reassign a readonly property
todo.completed = true; // OK
```

## 解题思路

首先回忆普通 Readonly 的写法：

```ts
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};
```

再看题目要求：

1. `K` 指定应设置为 Readonly 的 `T` 的属性集。（可以考虑使用 `&`，让一部分 readonly）
2. 如果未提供 `K`，则应使所有属性都变为只读，就像普通的 `Readonly<T>` 一样。（说明 `K` 要有默认值，`K = keyof T`）

```ts
type MyReadonly2<T, K extends keyof T = keyof T> = {
  readonly [P in K]: T[P];
} & {
  [P in Exclude<keyof T, K>]: T[P];
};
```
