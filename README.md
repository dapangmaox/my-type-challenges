# my-type-challenges

这是一个用来记录刷 [type-challenges](https://github.com/type-challenges/type-challenges) 的库。按照问题难度分类，每道题都有详细的解题过程，记录了本人在解题过程中的思路以及遇到的问题。

## 前置知识

在刷 type-challenges 之前，需要了解一些常用的语法和常见的套路。

### infer

`infer` 表示在 `extends` 条件语句中待推断的类型变量。

简单示例如下：

```typescript
type ParamType<T> = T extends (arg: infer P) => any ? P : T;
```

在这个条件语句 `T extends (arg: infer P) => any ? P : T` 中，`infer P` 表示待推断的函数参数。

整句表示为：如果 `T` 能赋值给 `(arg: infer P) => any`，则结果是 `(arg: infer P) => any` 类型中的参数 `P`，否则返回为 `T`。
