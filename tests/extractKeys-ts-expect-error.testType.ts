import { ExtractKeys } from "../src/ExtractKeys";
import { MainObject } from "./mocks/MainObject";
/**
 * Describe: ExtractKeys
 */
let noKeys: ExtractKeys<{}, MainObject>;
// @ts-expect-error
noKeys = "";

let MainOnlyKey: ExtractKeys<{ id: string }, MainObject>;
// @ts-expect-no-error
MainOnlyKey = "id";
// @ts-expect-error
MainOnlyKey = "name";

let KeyNotInMainObject: ExtractKeys<MainObject, MainObject>;
// @ts-expect-no-error
KeyNotInMainObject = "id";
// @ts-expect-error
KeyNotInMainObject = "bla";

let RequestedKeyNotInMainObject: ExtractKeys<
  MainObject & { bla: string },
  MainObject
>;
// @ts-expect-no-error
RequestedKeyNotInMainObject = "id";
// @ts-expect-error
RequestedKeyNotInMainObject = "bla";
