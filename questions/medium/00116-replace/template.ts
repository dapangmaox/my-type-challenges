type Replace<
  S extends string,
  From extends string,
  To extends string
> = S extends `${infer L}${From}${infer R}`
  ? From extends ''
    ? S
    : `${L}${To}${R}`
  : S;
