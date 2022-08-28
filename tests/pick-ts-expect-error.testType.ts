type MainObject = {
  id: string;
  name: string;
  nested: {
    id: string;
    name: string;
  };
  nestedArray: MainObject["nested"][];
};

let PickSelected: Pick<MainObject, "id">;
// @ts-expect-no-error
PickSelected = { id: "someString" };
// @ts-expect-error
PickSelected = { name: "someString" };

let PickObjectType: Pick<MainObject, "nested">;
// @ts-expect-no-error
PickObjectType = { nested: { id: "someString", name: "something" } };
// @ts-expect-error
PickObjectType = { id: "someString" };
// @ts-expect-error
PickObjectType = { nested: { id: "someString" } };

// @ts-expect-error
let PickItemNotInObject: Pick<MainObject, "bla">;
