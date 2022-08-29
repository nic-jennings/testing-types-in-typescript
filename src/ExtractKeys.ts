/**
 * Extract the intersecting Keys from two Object.
 * Right Object is the source of truth.
 */
export type ExtractKeys<T, Obj> = Extract<keyof T, keyof Obj>;
