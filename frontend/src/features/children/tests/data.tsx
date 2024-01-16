export type ChildObject = {
  id: number;
  name: string;
  fields: number[];
};

const child: ChildObject = {
  id: 1,
  name: "First",
  fields: [1, 2],
};

export const children: ChildObject[] = [
  child,
  {
    id: 2,
    name: "Second",
    fields: [1, 2],
  },
  {
    id: 3,
    name: "Third",
    fields: [1, 2],
  },
];
