export type valueOf<T> = T[keyof T];

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type DeepPartial<T> = T extends Function
  ? T
  : T extends object
  ? { [P in keyof T]?: DeepPartial<T[P]> }
  : T;

export type DeepRecord<T, K> = T extends Function
  ? K
  : T extends object
  ? { [P in keyof T]: DeepRecord<T[P], K> }
  : K;

export type DeepUnion<T, K> = T extends Function
  ? T
  : T extends object
  ? { [P in keyof T]: DeepUnion<T[P], K> | K }
  : T;

export type DeepIntersection<T, I> = T extends Function
  ? T
  : T extends object
  ? { [P in keyof T]: DeepIntersection<T[P], I> } & I
  : T;

export type ArrayToUnion<T extends any[]> = T[number];

export type ArrayToObject<A extends Array<any>> = {
  [P in keyof A]: A[P];
};

export type DeepArrayToObject<T> = T extends Function
  ? T
  : T extends object
  ? { [P in keyof T]: DeepArrayToObject<T[P]> }
  : T extends Array<any>
  ? ArrayToObject<T>
  : T;
