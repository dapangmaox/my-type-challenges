import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<LengthOfStringMedium<''>, 0>>,
  Expect<Equal<LengthOfStringMedium<'kumiko'>, 6>>,
  Expect<Equal<LengthOfStringMedium<'reina'>, 5>>,
  Expect<Equal<LengthOfStringMedium<'Sound! Euphonium'>, 16>>
];
