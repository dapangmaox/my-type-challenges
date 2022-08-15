type String2Array<S extends string> = S extends `${infer First}${infer Rest}`
  ? [First, ...String2Array<Rest>]
  : [];

type LengthOfStringMedium<S extends string> = String2Array<S>['length'];
