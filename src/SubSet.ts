import { ExtractKeys } from "./ExtractKeys";

/**
 * Returns a new Type where Two Objects recursively intersect.
 * Right Object is the source of true
 */
export type SubSet<T, Obj> = ExtractKeys<T, Obj> extends never
  ? never
  : {
      [Key in ExtractKeys<T, Obj> as Obj[Key] | undefined extends T[Key]
        ? Key
        : never]?: SubSetType<T, Obj, Key>;
    } & {
      [Key in ExtractKeys<T, Obj> as Obj[Key] | undefined extends T[Key]
        ? never
        : Key]: SubSetType<T, Obj, Key>;
    };

/**
 * Returns the Type where Two Objects Types intersect.
 * Right Object is the source of true
 */
type SubSetType<
  T,
  Obj,
  Key extends keyof T & keyof Obj
> = Obj[Key] extends object
  ? Obj[Key] extends Array<object>
    ? 0 extends keyof Obj[Key]
      ? 0 extends keyof T[Key]
        ? SubSet<T[Key][0], Obj[Key][0]>[]
        : never
      : never
    : SubSet<T[Key], Obj[Key]>
  : Obj[Key] | undefined extends T[Key]
  ? Obj[Key] | undefined
  : Obj[Key] extends T[Key]
  ? Obj[Key]
  : never;
