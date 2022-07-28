type DeepReadonly<T> = {
  readonly [P in keyof T]: keyof T[P] extends object
    ? T[P]
    : DeepReadonly<T[P]>;
};
