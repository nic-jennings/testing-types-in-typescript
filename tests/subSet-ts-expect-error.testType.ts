import { ExtractKeys, SubSet } from "./SubSet";

type MainObject = {
  id: string;
  name: string;
  nested: {
    id: string;
    name: string;
  };
  nestedArray: MainObject["nested"][];
};

const MainObjectValue: MainObject = {
  id: "bla",
  name: "bla",
  nested: {
    id: "bla",
    name: "bla",
  },
  nestedArray: [
    {
      id: "bla",
      name: "bla",
    },
  ],
};

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

/**
 * Describe: SubSet
 */
let SubSetNoKeys: SubSet<{ bla: unknown }, MainObject>;
// @ts-expect-error
SubSetNoKeys = {};
// @ts-expect-error
SubSetNoKeys = { id: "bla" };

let SubSetMainOnlyKey: SubSet<{ id: string }, MainObject>;
// @ts-expect-no-error
SubSetMainOnlyKey = { id: "bla" };
// @ts-expect-error
SubSetMainOnlyKey = { name: "bla" };

let SubSetKeyOptional: SubSet<{ id?: string; name: string }, MainObject>;
// @ts-expect-no-error
SubSetKeyOptional = { id: "bla", name: "bla" };
// @ts-expect-no-error
SubSetKeyOptional = { id: undefined, name: "bla" };
// @ts-expect-error
SubSetKeyOptional = { name: "bla" };

let SubSetMisMatchType: SubSet<{ id: number }, { id: string }>;
// @ts-expect-error
SubSetMisMatchType = { id: "bla" };
// @ts-expect-error
SubSetMisMatchType = { id: 1 };

let SubSetKeyNotInMainObject: SubSet<MainObject, MainObject>;
// @ts-expect-no-error
SubSetKeyNotInMainObject = MainObjectValue;
// @ts-expect-error
SubSetKeyNotInMainObject = { id: "bla" };
// @ts-expect-error
SubSetKeyNotInMainObject = { bla: "bla" };

let SubSetRequestedKeyNotInMainObject: SubSet<
  MainObject & { bla: string },
  MainObject
>;
// @ts-expect-no-error
SubSetKeyNotInMainObject = MainObjectValue;
// @ts-expect-error
SubSetRequestedKeyNotInMainObject = { id: "bla" };
// @ts-expect-error
SubSetRequestedKeyNotInMainObject = { ...MainObjectValue, bla: "bla" };

let NestedSubSetKeyInMainObject: SubSet<
  {
    nested: {
      id: string;
    };
  },
  MainObject
>;
// @ts-expect-no-error
NestedSubSetKeyInMainObject = MainObjectValue;
// @ts-expect-no-error
NestedSubSetKeyInMainObject = { nested: { id: "bla" } };
// @ts-expect-error
NestedSubSetKeyInMainObject = { nested: { name: "bla" } };

let NestedSubSetKeyNotInMainObject: SubSet<
  {
    nested: {
      bla: string;
    };
  },
  MainObject
>;
// @ts-expect-no-error
NestedSubSetKeyNotInMainObject = { nested: null as never };
// @ts-expect-error
NestedSubSetKeyNotInMainObject = MainObjectValue;
// @ts-expect-error
NestedSubSetKeyNotInMainObject = { nested: { id: "bla" } };
// @ts-expect-error
NestedSubSetKeyNotInMainObject = { nested: { name: "bla" } };

let NestedArraySubSetKeyNotInMainObject: SubSet<
  {
    nestedArray: {
      id: string;
    }[];
  },
  MainObject
>;
// @ts-expect-no-error
NestedArraySubSetKeyNotInMainObject = MainObjectValue;
// @ts-expect-no-error
NestedArraySubSetKeyNotInMainObject = { nestedArray: [{ id: "bla" }] };
// @ts-expect-error
NestedArraySubSetKeyNotInMainObject = { nestedArray: [{ name: "bla" }] };
