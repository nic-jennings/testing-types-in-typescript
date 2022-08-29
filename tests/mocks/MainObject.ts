export type MainObject = {
  id: string;
  name: string;
  nested: {
    id: string;
    name: string;
  };
  nestedArray: MainObject["nested"][];
};

export const MainObjectValue: MainObject = {
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
