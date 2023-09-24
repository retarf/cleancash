type cleaningObject = {
  id: number;
  date: string;
  bill: string;
  child: number;
  salary: number;
  field: number[];
};

const cleaning: cleaningObject = {
  id: 1,
  date: "2023-01-01",
  bill: "100.00",
  child: 1,
  salary: 1,
  field: [1, 2],
};

export const cleanings: cleaningObject[] = [
  cleaning,
  {
    id: 2,
    date: "2023-01-01",
    bill: "200.00",
    child: 2,
    salary: 2,
    field: [1, 2],
  },
  {
    id: 3,
    date: "2023-01-01",
    bill: "300.00",
    child: 3,
    salary: 3,
    field: [1, 2],
  },
];
