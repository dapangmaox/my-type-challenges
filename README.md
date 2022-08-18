# my-type-challenges

这是一个用来记录刷 [type-challenges](https://github.com/type-challenges/type-challenges) 的库。按照问题难度分类，每道题都有详细的解题过程，记录了本人在解题过程中的思路以及遇到的问题。

## 前置知识

在刷 type-challenges 之前，需要了解一些常用的语法和常见的套路。

### extends

`extends` 有两种用法，接口继承和条件判断。

### infer

`infer` 表示在 `extends` 条件语句中待推断的类型变量。

简单示例如下：

```typescript
type ParamType<T> = T extends (arg: infer P) => any ? P : T;
```

在这个条件语句 `T extends (arg: infer P) => any ? P : T` 中，`infer P` 表示待推断的函数参数。

整句表示为：如果 `T` 能赋值给 `(arg: infer P) => any`，则结果是 `(arg: infer P) => any` 类型中的参数 `P`，否则返回为 `T`。

### as 的用法

在映射时经常会用到 `as` 关键词，像下面代码一样：

```typescript
type MappedKey<T> = {
  [K in keyof T as K extends xxx ? never : K]: T[K];
};
```

一开始理解的是 `as` 左边要满足右边的条件，

其实不是的，这里 `as` 后面的语句使用来做筛选的，

遍历时得到的 `K` 需要做一些特殊的处理时，比如给 `K` 加上前缀或后缀，筛选符合某种条件的 `K`，用 `as` 连接条件语句

`as` 是 typescript 4.1 功能，文档链接： [Key Remapping in Mapped Type](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-1.html#key-remapping-in-mapped-types)

### 使用下划线忽略 ESLint 变量从未使用的警告

```typescript
type Last<T extends any[]> = T extends [...infer _R, infer P] ? P : undefined;

// _R 下划线可以让 eslint ignore unused variable 警告
```

### keyof any

```
keyof any`的结果为联合类型`string | number | symbol
type T = keyof any
// type T = string | number | symbol
```

### Record<Keys, Type>

构造一个属性键为`Keys`，属性值类型为`Type`的对象类型。

```typescript
// 一个简单地例子
type Person = Record<'name', string>;

// 一个稍微复杂的例子
interface CatInfo {
  age: number;
  breed: string;
}

type CatName = 'miffy' | 'boris' | 'mordred';

const cats: Record<CatName, CatInfo> = {
  miffy: { age: 10, breed: 'Persian' },
  boris: { age: 5, breed: 'Maine Coon' },
  mordred: { age: 16, breed: 'British Shorthair' }
};
```

### keyof any

```ts
type TS = keyof any;
// type TS = string | number | symbol

type TS = PropertyKey;
// built in: type PropertyKey = string | number | symbol
```

## 遇到的问题

### &

假如有如下代码：

```ts
type Todo = {
  title: string;
  description?: string;
  completed: boolean;
} & {
  readonly title: string;
};

const todo: Todo = {
  title: 'task',
  description: 'xxx',
  completed: false
};

todo.title = 'abc'; // 可以修改
```

`&` 两个同名的属性时，正确的行为是什么？
