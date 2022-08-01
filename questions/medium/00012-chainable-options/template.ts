type Chainable<T = {}> = {
  option<K extends string, V>(
    key: K extends keyof T ? never : K, // 为了不出现重复的 key
    value: V
  ): Chainable<T & { [P in K]: V }>;
  get(): T;
};
