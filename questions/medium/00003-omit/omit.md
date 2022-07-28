## 题目描述

不使用 `Omit` 实现 TypeScript 的 `Omit<T, K>` 泛型。

`Omit` 会创建一个省略 `K` 中字段的 `T` 对象。

例如：

```ts
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview = MyOmit<Todo, 'description' | 'title'>;

const todo: TodoPreview = {
  completed: false
};
```

## 解题思路

`Omit` 会从类型 `T` 中删除联合类型 `K` 中的属性。所以在实现类型时需要从 `T` 中所有的 keys 中 exclude 掉 K 中的属性。

```ts
type MyExclude<T, K> = T extends K ? never : T;

type MyOmit<T, K extends keyof T> = {
  [P in MyExclude<keyof T, K>]: T[P];
};
```

还可以进一步省略掉 `MyExclude` 类型：

```ts
type MyOmit<T, K extends keyof T> = {
  [P in keyof T as P extends K ? never : P]: T[P];
};
```

> 关于 `as` 的用法可以看 README
