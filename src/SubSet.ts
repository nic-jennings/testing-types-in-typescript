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
    ? number extends keyof Obj[Key] & keyof T[Key]
      ? SubSet<T[Key][number], Obj[Key][number]>[]
      : never
    : SubSet<T[Key], Obj[Key]>
  : Obj[Key] extends T[Key]
  ? Obj[Key]
  : never;
