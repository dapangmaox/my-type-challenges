// my answer
type First<T extends any[]> = T extends [infer P, ...any[]] ? P : never;

// a better answer
// type First<T extends any[]> = T['length'] extends 0 ? never : T[0];
